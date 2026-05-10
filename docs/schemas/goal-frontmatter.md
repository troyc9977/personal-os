# Goal frontmatter schema

The YAML frontmatter shape for files in `docs/goals/long-term/<slug>.md`.

A goal file has YAML frontmatter (between `---` lines) followed by a markdown
body of narrative. The frontmatter is what Compass reads to materialize tasks
and surface progress. The body is for the human reader.

This schema is the **strict spec** — names, shapes, and presence rules below
are canonical. Variant naming (`status` for `done`, `date` for `target`, etc.)
is not permitted. New type-specific fields require a schema update before
authoring; do not invent fields ad-hoc on a goal file. Drift is what the
2026-05-10 audit caught (see `docs/reviews/2026-05-10-goal-schema-audit.md`)
and what ADR-0012 closed.

---

## Required universal fields

Every goal file has all of these in its frontmatter, regardless of `type`.

```yaml
id:           string        # kebab-case, must match filename (without .md)
title:        string        # human-readable
type:         enum          # see "Type values" below
status:       enum          # active | paused | done | abandoned
priority:     int           # 1-9, see ADR-0002 priority order
created_at:   date          # ISO 8601 — when this file was authored
target_date:  date|null     # ISO 8601, e.g. 2026-10-18; null for open-ended
references:   list[string]  # see "references" below
sessions_log: list          # see "sessions_log" below; always present, even as []
milestones:   list          # see "milestones" below
```

Note on `slug`: `slug` is derived from filename (basename minus `.md`) and is
**not stored as a frontmatter field**. The architect and Compass both compute
it from the file path; do not add a `slug:` key to a goal file.

`status: active` means *currently being worked*. Three active goals with weekly
sessions each is healthy; twenty active goals means the discipline has slipped.
The librarian flags long-running active goals with no recent updates.

`priority` uses ADR-0002's ordering as the floor:
1 = WardForge, 2 = family/friends, 3 = reading, 4 = health, 5 = contemplation,
6 = writing, 7 = DCC, 8+ = other (suit, MacBook, trips).

### Type values

- `physical` — running, lifting, body work (e.g. marathon, ACL recovery)
- `behavioral` — habit changes (e.g. smoking taper)
- `career` — job, business, professional milestones (e.g. WardForge launch, DCC AI workflow)
- `creative` — writing, filmmaking, public-facing intellectual work (e.g. Substack)
- `intellectual` — reading commitments, study, learning
- `purchase` — savings goals (e.g. suit, MacBook)
- `trip` — travel
- `acquisition` — business or property acquisition (e.g. CNC shop, heritage restoration)

`type` drives which optional blocks are appropriate (see "Type-specific blocks").

### `references`

```yaml
references:   list[string]
```

Any substrate paths this goal relates to — ADRs, project files, sibling
long-term goal files, annual or quarterly goal docs, identity/people/routines
references. The list is informational; Compass does not currently navigate it.

### `milestones`

Canonical inline-object shape. No aliases.

```yaml
milestones:
  - { title: string, target: date|null, done: bool }
```

- `target` is the milestone's deadline. Spelled `target` (not `date`).
- `done` is the boolean completion flag. Spelled `done` (not `status`).
- Default `done: false` when authoring.

The Compass worker historically aliased `target`/`date` and `done`/`status`.
Per ADR-0012, the canonical names are `target` and `done`; the worker can drop
the aliases on its next deploy.

### `sessions_log`

Appended by Compass when scheduled tasks tick. Always present in the
frontmatter, even as `[]`, so write-paths don't have to materialize the key.

```yaml
sessions_log:
  - date:   date
    title:  string
    done:   bool
    note:   string|null
```

Don't author entries by hand; Compass writes them. For `behavioral` goals
that also use `daily_tracking`, the per-day count log lives in
`daily_tracking.log` (a separate, parallel append target). `sessions_log`
remains present as `[]` even when not actively used.

---

## Optional universal fields

Available to any goal type. Include them when meaningful; omit when not.

### `review_date`

```yaml
review_date:  date|null     # next planned re-evaluation; null if none scheduled
```

Optional. Include when a re-evaluation date is meaningfully scheduled (e.g.
post-taper, post-race, mid-sprint). Omit when not. Worked examples below show
`review_date` on most files for context — that's illustrative, not required.

### `tags`

```yaml
tags:         list[string]  # free-form labels; empty list [] if none
```

Optional. Include when meaningful labels exist; omit when not. Worked examples
below show `tags` for context — that's illustrative, not required.

### `schedule`

Day-of-week recurring sessions. Optional — many goals don't have a fixed
weekly cadence (e.g. `stop-smoking-2026.md` omits `schedule`).

```yaml
schedule:
  - { day: enum, title: string }
```

`day` is one of `mon | tue | wed | thu | fri | sat | sun | every`.

`start_day` (the Compass endpoint that creates today's daily entry) reads
active goals and materializes scheduled tasks for today's day-of-week. So a
marathon goal with `{ day: sun, title: "Long run" }` adds a `[marathon] Long
run` task to Sunday's daily list automatically.

Date-based scheduling rules (e.g. "every 1st Sunday of the month") are not
supported in v1. Day-of-week only.

### `phases`

Type-agnostic. Applicable to any goal with a temporal arc — physical ramps,
behavioral tapers, creative sprints, multi-stage acquisitions. Do not
restrict to physical/behavioral.

```yaml
phases:
  - { name: string, weeks: string, dates: string|null, target: string|null, long_run?: string|null }
```

- `name` — short label (e.g. "Base build", "Outline", "Foundation").
- `weeks` — string. Ranges (`"1-6"`), single weeks (`"3"`), or qualified
  values (`"final day"`, `"3 — May 21 only"`) are all valid. The string form
  preserves intent without forcing a numeric range.
- `dates` — human-readable date range (e.g. `"May 5 - Jun 14"`). Nullable.
- `target` — the intent of the phase in plain prose. Nullable.
- `long_run` — **omittable entirely.** Include only on running-focused
  `physical` goals where the phase has a meaningful weekly long-run target.
  Non-running goals (ACL return-to-sport, screenplay, smoking taper) drop the
  key — do not pad with `long_run: null`.

### `parent` and `subgoals` — reserved for tree model, not yet in use

```yaml
parent:    string|null     # parent goal id
subgoals:  list[string]    # ids of child goal files
```

Reserved for a future tree model where one long-arc goal decomposes into
sibling goal files. No live file uses these as of 2026-05-10. Authors should
omit both keys; Compass does not consume them yet. The librarian will flag
their first use as a schema-evolution event.

---

## Type-specific blocks

These blocks attach to specific `type` values. The architect updates this
schema before introducing a new field on a goal file.

### `physical` and `behavioral`: stretch goal with explicit decision rule

For "do X, with stretch to Y if conditions met":

```yaml
stretch:
  goal:           string      # what the stretch upgrade is
  decision_date:  date        # when to decide
  decision_rule:  string      # the explicit rule, multi-line text
```

### `behavioral`: taper, maintenance, slip protocol

Quitting/reducing patterns. Six-week tapers, post-taper maintenance, what
triggers a step-back.

```yaml
method:  string               # e.g. "cold turkey, NRT allowed for hard cravings"

taper:
  start_date:  date
  weeks:
    - { week: int, dates: string, target_per_day: int }

maintenance:
  starts:  date               # day after taper ends
  target:  string             # e.g. "1 per week max, indefinitely"

slip_protocol: |
  Multi-line description of what triggers a step-back, what the step-back is,
  and what triggers a method revisit.

triggers:
  - { description: string, note: string|null }
```

### `creative`: phases as the decomposition

`creative` goals with a temporal arc use the universal `phases[]` block.
`long_run` is omitted entirely (creative work has no running component). See
`screenplay-may-21.md` for the live shape.

### `purchase`: target amount

Savings goals.

```yaml
target_amount:    int
current_amount:   int         # update manually or via Compass v3+
```

No live `purchase` goal file exists yet (the `buy-suit` example below is
schematic).

### `trip`: typically just milestones

Trip goals usually only need `milestones` for "book flights," "book
accommodation," "plan itinerary," "depart," "return." No extra blocks needed.

### `acquisition`: decision triggers and constraints

Business or property acquisition.

```yaml
decision_triggers:            # what makes this thesis become active work
  - string

constraints:                  # operational guardrails
  - string
```

No live `acquisition` goal file exists yet (CNC shop and heritage
restoration files are referenced by ADR-0007 but unauthored).

---

## Optional top-level blocks

Available to any goal type. Include when the situation calls for them.

### `league`

For goals tied to a league or team-sport season — readiness gating, league
start window, weekly commitments. First introduced on
`acl-return-to-sport.md` (return-to-sport context); structurally available
to any goal that joins a league.

```yaml
league:
  league_start_target:    date|null         # when league play is intended to start
  league_start_earliest:  date|null         # earliest acceptable start, if conditional
  readiness_gate:         string|null       # optional: required pre-conditions
  weekly_commitments:     list[string]      # league nights / matches
```

`readiness_gate` is **optional**. Required only when the earliest start is
conditional on a clinical or readiness check — e.g. post-injury return.
Future league goals (joining a new league without an injury context) omit
`readiness_gate`.

### `daily_tracking`

Per-day measurement against a metric. **Type-agnostic** — any goal type
may use `daily_tracking` when per-day measurement is the appropriate
shape. Live uses: `stop-smoking-2026.md` (`behavioral`, hard ceiling)
and `reading-2026.md` (`intellectual`, soft floor). ADR-0013 introduced
the `session_log` input type.

```yaml
daily_tracking:
  metric:        string         # e.g. "cigarettes", "pages"
  unit:          string         # e.g. "count"
  input:         string         # see "input values" below
  daily_target:  int|null       # optional; soft target. Omit when target is dynamic.
  log:           []             # appended by Compass; shape depends on `input`
```

#### `input` values

`input` selects the Compass widget and the per-entry shape that gets
appended to `log[]`. Adding a new `input` value requires an ADR (the
widget is a Compass-repo change as well).

- **`tap_increment`** — single counter, ticked up through the day by a
  tap widget. One entry per day. Live use: `stop-smoking-2026.md`.
  Per-day log entry shape: `{ date, count, target, times: [HH:MM, ...] }`.

- **`session_log`** — per-session structured entries with a label.
  Multiple entries per day are summed for the day's total. Introduced
  in ADR-0013. Live use: `reading-2026.md`. Per-entry shape:
  `{ date, book, pages }`. Book is a free-form string, typically drawn
  from the goal's `currently_reading` list. No timestamp.

  v1 is hard-wired to the reading shape (`book`, `pages`). Future
  `session_log` consumers with different label/count field names need
  either a small schema extension or a new `input` value via ADR.

#### `daily_target`

Optional. Integer or null. **Soft target — used for display and
aggregation, not enforcement.** Compass shows the day's running total
against `daily_target` if set; nothing blocks or shames a miss.

Include `daily_target` when the target is static (e.g. reading's 35
pages/day floor). Omit when the target is dynamic and derives from
another block — e.g. the smoking goal's daily target is read out of
`taper.weeks[i].target_per_day` for whichever week today falls into, so
`daily_tracking.daily_target` is omitted on that file.

#### Log location

When `daily_tracking` is present, the per-day or per-session log
accumulates in `daily_tracking.log`, not in `sessions_log`.
`sessions_log: []` stays present on the file as a universal field.

The Compass worker historically absorbed minor shape variation in
`daily_tracking` via a multi-shape resolver in `getCurrentCap()`;
declaring this canonical shape lets that resolver simplify on the
worker's next deploy.

### Reading-style list blocks

Three `list[string]` blocks for active/queued/completed items.
Introduced by ADR-0013 for `reading-2026.md`; the schema is
type-agnostic so future goals where the same active/queue/done shape
fits (e.g. a film curriculum, a paper queue) can reuse it.

```yaml
currently_reading:  list[string]    # active items, free-form strings
to_read:            list[string]    # queued items
finished:           list[string]    # completed items
```

Entries are **free-form strings**, not structured records. The typical
shape for books is `"Author — Title"` (em-dash separator), optionally
qualified with edition/translator in parentheses (e.g.
`"Epictetus — Discourses (Penguin Classics)"`). This is intentional:
the tracker is for practice, not bibliography. If structured book
records become valuable later (ISBN, edition metadata, dates), that's
a schema-evolution step worth its own ADR.

All three blocks are individually optional. A future goal might use
`currently_reading` and `finished` without a `to_read` queue, or vice
versa. Authors omit blocks that carry no meaning rather than padding
with `[]`.

---

## Body conventions

After the closing `---`, the body is markdown narrative. Recommended
structure:

```markdown
# <Title repeated as H1>

## Why this matters
2-4 sentences on the why. Connect to identity.md or ADR rationale where relevant.

## Approach
Brief sketch of the strategy. References to project file or ADR if longer
context lives there.

## Watch-for signals
Bullet list of things that would tell Troy this goal is drifting or in trouble.
Honest, specific.

## Open
Things not yet decided. Surfaces ambiguity rather than hiding it.

## Related
- ADR-NNNN, project file, parent goal, etc.
```

The body is for the human (or future-Troy reading in 6 months). The
frontmatter is for Compass.

---

## Worked examples

### Physical (marathon — running with `long_run`)

```yaml
---
id: toronto-half-2026
title: Toronto Waterfront Half Marathon (with full-marathon stretch)
type: physical
status: active
priority: 4
created_at: 2026-05-05
target_date: 2026-10-18
review_date: 2026-08-16
tags: [running, marathon, health]
references:
  - docs/decisions/0002-priority-ordering.md
  - docs/decisions/0011-acl-block-priority-over-marathon-phase-1.md
  - docs/goals/2026.md
  - docs/goals/2026-Q2.md
  - docs/goals/long-term/acl-return-to-sport.md
  - docs/projects/habits.md

stretch:
  goal: full-marathon
  decision_date: 2026-08-16
  decision_rule: |
    Upgrade to full at registration if ALL of:
    - August half time <= 1:55
    - Knee asymptomatic through phase 2 and phase 3
    - <=1 missed training week across base + aerobic blocks

milestones:
  - { title: "Register for Toronto Waterfront Half", target: 2026-05-10, done: false }
  - { title: "Base build complete (25 km/wk, long run 10 km)", target: 2026-06-14, done: false }
  - { title: "Aerobic block complete (35 km/wk, long run 16 km)", target: 2026-07-26, done: false }
  - { title: "August half (decision point on full upgrade)", target: 2026-08-16, done: false }
  - { title: "Long run peaks (22 km half / 32 km full)", target: 2026-09-06, done: false }
  - { title: "Race day", target: 2026-10-18, done: false }

phases:
  - { name: "Base build",       weeks: "1-6",   dates: "May 5 - Jun 20",  target: "Paused to 2 runs/week (Wed easy + Sun long) per ADR-0011.", long_run: "to ~10 km, 2x/week schedule" }
  - { name: "Aerobic dev",      weeks: "7-13",  dates: "Jun 21 - Aug 8",  target: "Re-entry from ~14 km/wk base. 4-5 runs/week, 1 tempo, peak 30-35 km/wk.", long_run: "to ~16 km" }
  - { name: "Half-specific",    weeks: "14-19", dates: "Aug 9 - Sep 20",  target: "4-5 runs/week, race-pace work, peak 35-40 km/wk", long_run: "peaks ~22 km" }
  - { name: "Sharpen / decide", weeks: "20",    dates: "Sep 21 - Sep 27", target: "Compressed to 1 week. Mild taper if half; long-run focus if upgrading.", long_run: "peak ~32 km if full" }
  - { name: "Race window",      weeks: "21-24", dates: "Sep 28 - Oct 18", target: "final taper", long_run: null }

schedule:
  - { day: wed, title: "Easy run" }
  - { day: sun, title: "Long run" }

sessions_log: []
---
```

### Behavioral (smoking taper)

```yaml
---
id: stop-smoking-2026
title: Stop smoking — six-week taper, then maintenance
type: behavioral
status: active
priority: 4
created_at: 2026-05-05
target_date: 2026-06-15
review_date: 2026-06-15
tags: [health, habit-change]
references:
  - docs/decisions/0002-priority-ordering.md
  - docs/projects/habits.md

method: "Cold turkey within taper; NRT allowed for hard post-work cravings"

taper:
  start_date: 2026-05-05
  weeks:
    - { week: 1, dates: "May 5-11",     target_per_day: 6 }
    - { week: 2, dates: "May 12-18",    target_per_day: 5 }
    - { week: 3, dates: "May 19-25",    target_per_day: 4 }
    - { week: 4, dates: "May 26-Jun 1", target_per_day: 3 }
    - { week: 5, dates: "Jun 2-8",      target_per_day: 2 }
    - { week: 6, dates: "Jun 9-15",     target_per_day: 1 }

maintenance:
  starts: 2026-06-16
  target: "1 per week max, indefinitely"

slip_protocol: |
  Three consecutive over-plan days -> drop to previous week's target for 7 days,
  then re-attempt the next step.

triggers:
  - { description: "Post-work decompression on DCC office days", note: "highest-frequency window historically" }
  - { description: "Drinks with friends on weekends", note: "social, situational" }

daily_tracking:
  metric: cigarettes
  unit: count
  input: tap_increment
  log: []

milestones:
  - { title: "Taper complete (1/day floor held for week 6)", target: 2026-06-15, done: false }
  - { title: "30 days at maintenance",                       target: 2026-07-16, done: false }

sessions_log: []
---
```

### Creative (screenplay sprint — `phases[]` without `long_run`)

```yaml
---
id: screenplay-may-21
title: Short film script — outline to polish in 13 days
type: creative
status: active
priority: 6
created_at: 2026-05-09
target_date: 2026-05-21
review_date: 2026-05-21
tags: [creative, sprint]
references:
  - docs/decisions/0002-priority-ordering.md
  - docs/identity.md

milestones:
  - { title: "Beat sheet done",              target: 2026-05-10, done: false }
  - { title: "First draft to FADE OUT",      target: 2026-05-17, done: false }
  - { title: "Polish complete — script done", target: 2026-05-21, done: false }

phases:
  - { name: "Outline", weeks: "1",                dates: "May 9 - May 10",  target: "Beat sheet — full sequence of beats, no prose yet" }
  - { name: "Draft",   weeks: "2",                dates: "May 11 - May 17", target: "First draft to FADE OUT. Get there ugly if needed." }
  - { name: "Revise",  weeks: "3",                dates: "May 18 - May 20", target: "Structural and dialogue passes." }
  - { name: "Polish",  weeks: "3 — May 21 only",  dates: "May 21",          target: "Final read; format clean; done." }

schedule:
  - { day: mon, title: "Screenplay session (~1.5 hr, evening)" }
  - { day: sat, title: "Screenplay heavy creative block (morning)" }
  - { day: sun, title: "Screenplay heavy creative block (morning)" }

sessions_log: []
---
```

### Intellectual (reading practice — `daily_tracking` with `session_log`, reading-style list blocks)

Brief illustration. The full live file is `reading-2026.md`; this snippet
shows only the shape introduced by ADR-0013. Soft-floor framing (no
ceiling, no milestones, `daily_target` for display only).

```yaml
---
id: reading-2026
title: Daily reading practice — 2026
type: intellectual
status: active
priority: 3
created_at: 2026-05-10
target_date: null
tags: [reading, curriculum]
references:
  - docs/decisions/0002-priority-ordering.md
  - docs/decisions/0013-reading-tracker-architecture.md
  - docs/reading.md
  - docs/reading-log/

daily_tracking:
  metric: pages
  unit: count
  input: session_log
  daily_target: 35
  log: []

currently_reading:
  - "Robert Caro — The Power Broker"
  - "E. B. White — Here Is New York"

to_read:
  - "Plutarch — Greek Lives"

finished:
  - "C. S. Lewis — Mere Christianity"

milestones: []

sessions_log: []
---
```

### Purchase (schematic — no live file yet)

```yaml
---
id: buy-suit
title: Saville-Row-grade suit
type: purchase
status: active
priority: 8
created_at: 2026-05-10
target_date: null
review_date: null
tags: [purchase]
references: []

target_amount: 4000
current_amount: 0

milestones:
  - { title: "Save first $1000", target: null, done: false }
  - { title: "Choose tailor",    target: null, done: false }
  - { title: "Place order",      target: null, done: false }

sessions_log: []
---
```

### Acquisition (schematic — no live file yet)

```yaml
---
id: cnc-shop-acquisition
title: CNC shop acquisition (long-horizon thesis)
type: acquisition
status: paused
priority: 9
created_at: 2026-05-10
target_date: null
review_date: 2027-01-01
tags: [acquisition, long-arc]
references:
  - docs/decisions/0007-heritage-and-cnc-time-horizons.md

decision_triggers:
  - "WardForge stable revenue covers personal floor"
  - "Capital ready and a real shop comes on market"

constraints:
  - "Cannot start while WardForge phase 2 is unfinished"
  - "Geography limited to commutable from Toronto"

milestones:
  - { title: "Thesis revisit at WardForge phase 2 close", target: null, done: false }

sessions_log: []
---
```

---

## Schema evolution

This schema will grow. When a new goal needs a field that's not here:

1. Architect proposes the addition in a draft of the new goal file.
2. Architect updates this schema doc in the same change.
3. If the addition is structurally significant (changes how Compass parses
   goal files, or changes the meaning of an existing field), an ADR is
   required before the change lands.

The librarian validates existing goal files against this schema and flags
drift. ADR-0012 (canonical goal frontmatter schema) is the governing
decision; subsequent additions amend or supersede it as needed.
