# Goal frontmatter schema

The YAML frontmatter shape for files in `docs/goals/long-term/<slug>.md`.

A goal file has YAML frontmatter (between `---` lines) followed by a markdown
body of narrative. The frontmatter is what Compass reads to materialize tasks
and surface progress. The body is for the human reader.

## Required fields

```yaml
id:           string    # kebab-case, must match filename (without .md)
title:        string    # human-readable
type:         enum      # see "Type values" below
status:       enum      # active | paused | done | abandoned
target_date:  date|null # ISO 8601, e.g. 2026-10-18; null for open-ended
priority:     int       # 1-9, see ADR-0002 priority order
```

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

## Common optional fields

```yaml
parent:       string|null     # parent goal id, for trees. Default null.
references:   list[string]    # related ADRs (e.g. "docs/decisions/0007-...md"), project files
```

## Decomposition

```yaml
milestones:                   # checklist items inside this file
  - title:       string
    target:      date|null    # optional milestone deadline
    done:        bool         # default false

subgoals:                     # ids of child goal files
  - subgoal-slug
```

Most goals only need milestones. Promote to a subgoal file only when something
earns its own narrative (e.g. the decline-of-West essay as a subgoal of the
Substack launch).

## Scheduling

```yaml
schedule:                     # day-of-week recurring sessions
  - day:    string            # mon | tue | wed | thu | fri | sat | sun | every
    title:  string            # task title; will be prefixed with [<goal-slug>] when materialized
```

`start_day` (the Compass endpoint that creates today's daily entry) reads
active goals and materializes scheduled tasks for today's day-of-week. So
a marathon goal with `{ day: sun, title: "Long run" }` adds a `[marathon]
Long run` task to Sunday's daily list automatically.

Date-based scheduling rules (e.g. "every 1st Sunday of the month") are not
supported in v1. Day-of-week only.

## Tracking

```yaml
sessions_log:                 # appended by Compass when scheduled tasks tick
  - date:   date
    title:  string
    done:   bool
    note:   string|null       # optional inline note from the daily entry
```

This is where the goal file accumulates a real record of what got done against
it. Don't author entries by hand; Compass writes them.

## Type-specific blocks

### `physical` and `behavioral`: phases

Marathon training and similar ramped efforts. Phase entries describe the
intent of each phase; the weekly pool gets the specific numbers during
Sunday setup.

```yaml
phases:
  - name:    string           # e.g. "Base build"
    weeks:   string           # e.g. "1-6"
    dates:   string           # e.g. "May 5 - Jun 14"
    target:  string           # e.g. "4 easy runs/week, 15 → 25 km/week"
    long_run: string|null     # phase-specific long run target
```

### `physical`: stretch goal with explicit decision rule

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
    - week:           int
      dates:          string  # e.g. "May 5-11"
      target_per_day: int

maintenance:
  starts:  date               # day after taper ends
  target:  string             # e.g. "1 per week max, indefinitely"

slip_protocol: |
  Multi-line description of what triggers a step-back, what the step-back is,
  and what triggers a method revisit.

triggers:                     # optional, observed patterns
  - description:  string
    note:         string|null
```

### `behavioral`: tap-counter daily tracking

For goals where Compass has a tap-increment widget (currently smoking).

```yaml
daily_tracking:
  metric:  string             # e.g. "cigarettes"
  unit:    string             # e.g. "count"
  input:   string             # currently only "tap_increment"
  log:     []                 # appended daily by Compass: { date, count, target, times: [HH:MM, ...] }
```

### `purchase`: target amount

Savings goals.

```yaml
target_amount:    int
current_amount:   int         # update manually or via Compass v3+
```

### `trip`: typically just milestones

Trip goals usually only need `milestones` for "book flights," "book accommodation,"
"plan itinerary," "depart," "return." No extra blocks needed.

### `acquisition`: decision triggers and constraints

Business or property acquisition.

```yaml
decision_triggers:            # what makes this thesis become active work
  - string

constraints:                  # operational guardrails
  - string
```

## Body conventions

After the closing `---`, the body is markdown narrative. Recommended structure:

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

## Examples

### Physical (marathon)

```yaml
---
id: toronto-half-2026
title: Toronto Waterfront Half Marathon (with full-marathon stretch)
type: physical
target_date: 2026-10-18
status: active
priority: 4
references:
  - docs/decisions/0010-add-gym-to-habits.md
  - docs/projects/habits.md

stretch:
  goal: full-marathon
  decision_date: 2026-08-16
  decision_rule: |
    Upgrade to full at registration if ALL of:
    - August half time ≤ 1:55
    - Knee asymptomatic through phase 2 and phase 3
    - ≤1 missed training week across base + aerobic blocks

milestones:
  - { title: "Register for Toronto Waterfront Half", target: 2026-05-10, done: false }
  - { title: "Base build complete (25 km/wk, long run 10 km)", target: 2026-06-14, done: false }
  - { title: "Aerobic block complete (35 km/wk, long run 16 km)", target: 2026-07-26, done: false }
  - { title: "August half (decision point)", target: 2026-08-16, done: false }
  - { title: "Long run peaks (22 km half / 32 km full)", target: 2026-09-06, done: false }
  - { title: "Finish race day", target: 2026-10-18, done: false }

phases:
  - { name: "Base build", weeks: "1-6", dates: "May 5 - Jun 14", target: "4 easy runs/week, 15 → 25 km/wk", long_run: "to ~10 km" }
  - { name: "Aerobic dev", weeks: "7-12", dates: "Jun 15 - Jul 26", target: "4-5 runs/week, 1 tempo, peak 30-35 km/wk", long_run: "to ~16 km" }
  - { name: "Half-specific", weeks: "13-18", dates: "Jul 27 - Sep 6", target: "4-5 runs/week, race-pace work, peak 35-40 km/wk", long_run: "peaks ~22 km" }
  - { name: "Sharpen / decide", weeks: "19-21", dates: "Sep 7 - Sep 27", target: "mild taper if half; long-run focus if upgrading", long_run: "peak ~32 km if full" }
  - { name: "Race window", weeks: "22-24", dates: "Sep 28 - Oct 18", target: "final taper", long_run: null }

schedule:
  - { day: tue, title: "Easy run" }
  - { day: thu, title: "Tempo run (from phase 2)" }
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
target_date: 2026-06-15
status: active
priority: 4

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
  Three consecutive over-plan days → drop to previous week's target for 7 days,
  then re-attempt the next step. Two failed step-backs in same week → method revisit.

daily_tracking:
  metric: cigarettes
  unit: count
  input: tap_increment
  log: []

milestones:
  - { title: "30 days at maintenance", target: 2026-07-16, done: false }
  - { title: "90 days at maintenance", target: 2026-09-15, done: false }
  - { title: "365 days at maintenance", target: 2027-06-15, done: false }
---
```

### Career (Substack)

```yaml
---
id: substack-2026
title: First external publication, Substack opens around it
type: creative
target_date: 2026-11-30
status: active
priority: 6
references:
  - docs/decisions/0009-substack-launch-timeline-revision.md
  - docs/projects/substack.md

milestones:
  - { title: "X following → 400", target: 2026-09-15, done: false }
  - { title: "Decline-of-West section 1 drafted", target: 2026-06-30, done: false }
  - { title: "First publishable piece complete", target: 2026-10-15, done: false }
  - { title: "First piece published in external venue", target: 2026-11-30, done: false }
  - { title: "Substack launch around the publication", target: 2026-11-30, done: false }

schedule:
  - { day: sat, title: "Writing block" }

sessions_log: []
---
```

### Purchase (suit)

```yaml
---
id: buy-suit
title: Saville-Row-grade suit
type: purchase
status: active
priority: 8
target_date: null
target_amount: 4000
current_amount: 0

milestones:
  - { title: "Save first $1000", done: false }
  - { title: "Choose tailor", done: false }
  - { title: "Place order", done: false }
---
```

## Schema evolution

This schema will grow. When a new goal needs a field that's not here:

1. Architect proposes the addition in a draft of the new goal file.
2. Architect updates this schema doc in the same change.
3. If the addition is structurally significant (changes how Compass parses
   goal files, or changes the meaning of an existing field), an ADR is
   required before the change lands.

The librarian validates existing goal files against this schema and flags
drift.
