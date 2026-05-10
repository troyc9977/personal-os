# 0013: Reading tracker architecture — `session_log` input type and reading-style list blocks

## Status

Accepted — 2026-05-10

## Context

Reading sits at priority 3 in ADR-0002 — above health, contemplation,
writing, and DCC — but has had no structured tracking surface. The
existing artifacts cover different purposes:

- `docs/reading.md` — hand-maintained curriculum and standing list.
  Reading principles. Not parseable, not dated.
- `docs/reading-log/YYYY-MM.md` — monthly narrative reflection log.
  Page numbers appear inline as prose, not as structured data.
  Substantial notes promote to `docs/notes/`.
- `docs/notes/` — substantial book notes when they accumulate.

Daily activity — pages per session, often across multiple concurrent
books — had no home. The closest substrate-shaped neighbour is the
smoking taper's `daily_tracking` block on `stop-smoking-2026.md`
(ADR-0010 / ADR-0012), but that's a tap-increment counter against a
hard ceiling. Reading wants a soft floor (30-40 pages/day), per-session
granularity (book label + page count), and no shame on misses — the
posture is "notice drift, don't enforce compliance."

The substrate-as-avoidance check applies. Adding tracking only matters
if it surfaces drift Troy would otherwise miss. The honest test: when
reading collapses for two weeks under WardForge load, does the substrate
show it? Without per-day pages aggregated against a soft target, no.

## Decision

Author a goal-file-based reading tracker at
`docs/goals/long-term/reading-2026.md`, using the canonical schema
(ADR-0012) with two additions:

1. A new `input` value for `daily_tracking`: **`session_log`**.
   Per-session entries with structured fields `{ date, book, pages }`.
   Multiple entries per day are summed for the day's total. No timestamp.
   v1 is hard-wired to the reading shape (`book`, `pages`); future
   consumers of `session_log` with different label/count field names
   require a schema extension or a new `input` value via ADR.

2. A new optional field on `daily_tracking`: **`daily_target: int|null`**.
   Soft target — used for display and aggregation, not enforcement.
   Compass shows the day's running total against `daily_target` if set;
   nothing blocks or shames a miss. Reading sets `daily_target: 35` (the
   mid-point of the 30-40 page range). Smoking omits it, because its
   daily target is dynamic from `taper.weeks[i].target_per_day`.

The reading goal also introduces three optional top-level list blocks:
**`currently_reading`**, **`to_read`**, **`finished`** — each
`list[string]` of free-form entries (typically `"Author — Title"`,
optionally qualified with edition/translator). The schema is
type-agnostic; future goals where the active/queue/done shape fits
(film curriculum, paper queue) can reuse the blocks.

The architecture inverts the smoking-tracker framing: soft floor rather
than hard ceiling, structured per-session rather than tap-increment
counter, free-form item labels rather than a single metric. The
substrate shape (`daily_tracking` block on a goal file) stays the same.

`docs/reading-log/YYYY-MM.md` is unchanged. It remains the parallel
narrative log: quotes, reactions, brief takes. The goal file's
`daily_tracking.log` carries the structured count; the reading-log
files carry the narrative. Two purposes, two files.

The Compass repo will need a new widget for the `session_log` input
type — book selector (dropdown of the goal's `currently_reading` list),
pages input, submit. That work is out of scope here and tracked
separately in the Compass repo.

## Consequences

### Positive

- Daily reading activity has a tracker that matches the practice's
  actual shape (multiple concurrent books, per-session entries).
- Drift becomes visible. Aggregate consistently under 20 pages/day for
  two weeks surfaces as a watch-for signal on the goal file, not as
  something Troy has to notice in his head.
- `daily_tracking` becomes type-agnostic in the schema, not
  behavioral-only. The reading goal is the first `intellectual`
  consumer; the framing generalizes.
- Reading-style list blocks (`currently_reading` / `to_read` /
  `finished`) are reusable for any future goal with the same shape.

### Negative

- Schema surface grows: a new `input` value, a new optional field on
  `daily_tracking`, three new top-level list blocks. Each is small but
  the schema doc gets longer.
- Compass needs widget work in a separate repo before the tracker is
  usable in the UI. Until that ships, the goal file is read-only;
  entries would be hand-edited if used at all. This is acceptable —
  the substrate change is independent of the worker change, and
  coupling them would block both (same logic as ADR-0012).

### Neutral

- The `session_log` v1 shape is reading-specific (`book`, `pages`).
  Generalizing it to other label/count pairs is deferred to first
  real second-consumer demand; documenting the constraint up-front
  prevents premature abstraction.
- `docs/reading-log/YYYY-MM.md` and the goal file's
  `daily_tracking.log` carry partially redundant data (page counts
  appear in both, in different shapes). This is intentional — they
  serve different readers (human narrative vs structured aggregation)
  — but is worth a future audit if redundancy becomes confusion.

## Alternatives considered

- **Structure the existing `reading-log/YYYY-MM.md` format directly**
  — define a parseable shape for those files and skip the goal file.
  Rejected: conflates narrative reflection (what the reading-log
  files are *for*) with structured tracking data. The Compass parser
  contract for daily/weekly/inbox already demonstrates how brittle
  load-bearing formats become; the reading-log files should stay
  prose-shaped.

- **Tap-increment input** like the smoking tracker — a single daily
  page counter, ticked up through the day. Rejected: loses per-book
  context, which is the whole point of aggregate-with-breakdown.
  Knowing the day totaled 35 pages matters less than knowing it was
  30 pages of Caro plus 5 of E. B. White.

- **Just-in-daily-entries**, like habits — a "read today" checkbox in
  `docs/daily/`. Rejected: doesn't capture the magnitude (pages),
  doesn't fit the checkbox shape Compass parses, and binary tracking
  is exactly the framing reading shouldn't adopt (a 5-page day and a
  50-page day are not the same thing).

- **No tracker at all** — keep the reading-log files as the only
  artifact. Rejected because the substrate's job is to make drift
  visible. The reading-log files don't aggregate; a thin month is
  only obvious if Troy goes looking for it. The whole point of
  ADR-0002's priority order is to make slippage detectable.

## Watch-for

- Pages logged but no notes accumulating on serious books — surface
  reading, not formation. The reading-log files and `docs/notes/`
  are where that's caught.
- A second goal needs `session_log` with non-`(book, pages)` fields
  — that's the schema-evolution event for either a v2 `session_log`
  shape or a new `input` value. Don't bend `book`/`pages` to fit.
- `currently_reading` ballooning past 4-5 entries — overcommitment
  signal (named on the reading goal file itself).
- The Compass widget shipping with subtle shape variation — the same
  multi-shape-resolver drift that ADR-0012 closed. Hold the canonical
  shape; flag worker drift to the librarian.

## Related

- `docs/decisions/0002-priority-ordering.md` — reading at #3
- `docs/decisions/0012-canonical-goal-frontmatter-schema.md` — canonical schema this extends
- `docs/schemas/goal-frontmatter.md` — updated in the same commit
- `docs/goals/long-term/reading-2026.md` — the live goal file
- `docs/reading.md` — curriculum and standing list
- `docs/reading-log/` — parallel narrative log; not absorbed into the goal file. No `docs/projects/reading.md` exists; the reading-log directory is the project surface.
