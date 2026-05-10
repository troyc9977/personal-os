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
  - "Plutarch — Roman Lives"
  - "Joshua Foer — Moonwalking with Einstein"

finished:
  - "Vladimir Nabokov — Lectures on Literature"
  - "C. S. Lewis — Mere Christianity"
  - "Epictetus — Discourses (Penguin Classics)"
  - "James Fox — The World According to Color"

milestones: []

sessions_log: []
---

# Daily reading practice — 2026

## Why this matters

Reading sits at #3 in the priority order (per ADR-0002) — above health,
contemplation, writing, and DCC. It is the long-arc investment in synthesis
ability: the formation that lets every other lane (WardForge, Substack, the
25-year project) actually have something to say. Identity.md names "read fewer
better books" as a value and contemplation-over-consumption as a posture.

This goal exists to notice drift, not to enforce compliance. The target is a
soft floor — meaningful enough to surface a pattern when reading collapses
under WardForge load, lax enough that a thin week is not a failure. The
honest record matters more than the streak.

## Approach

30-40 pages/day across whatever's in `currently_reading`. Mid-point 35 is the
soft daily target. Multiple concurrent books are fine and expected — the
identity-file rhythm of "one serious book + one lighter book in parallel"
is the working shape.

Tracking happens per-session via Compass: book + pages, aggregated to a daily
total against the 35-page floor. The book label preserves per-book context
(which is the whole point of aggregate-with-breakdown — knowing whether the
30 pages were Caro or something lighter).

`docs/reading-log/YYYY-MM.md` stays as the parallel narrative log — quotes,
reactions, brief takes. Substantial notes still promote to `docs/notes/`.
The goal file's `daily_tracking.log` is for the structured count; the
reading-log files are for the narrative. Two purposes, two files.

## Watch-for signals

- Aggregate consistently under 20 pages/day for 2+ weeks — drift signal,
  not a failure. The question is what's eating the slot.
- `currently_reading` ballooning past 4-5 books — overcommitment. Finish
  before adding. The standing rule from identity.md ("Stop when a book
  isn't working") covers the exit path; the watch is for entries piling up
  without exits.
- `to_read` growing faster than `finished` indefinitely — acquisition
  outpacing consumption. Fine in absolute terms (a permanent shelf is the
  point per `reading.md`), drift signal if persistent for months.
- Pages logged but no notes accumulating on serious books — surface
  reading, not formation. The reading principles in `reading.md` name this:
  "Notes for serious books, no notes for entertainment."

## Open

- Articles, papers, Substacks — out of scope for v1. Books only. Revisit
  if a meaningful share of reading time is going to non-book material that
  the tracker can't see.
- Whether to add weekly or monthly aggregate targets later. The daily
  soft-floor is the minimum-viable shape; rolling-average framing can be
  added without schema change if the daily framing proves too noisy.
- Auto-archive policy for `finished`. Currently manual — entries stay in
  the list. If the list grows to dozens by year-end, decide whether to
  rotate older items into a separate archive file or leave as the
  cumulative record.
- Whether the Epictetus edition string ("Penguin Classics") matches the
  actual translation Troy read. `docs/reading.md` doesn't yet name editions
  for finished books; correct in place when the actual translator is
  confirmed.

## Related

- ADR-0013 — this tracker's architecture (session_log input type, soft-floor framing)
- ADR-0002 — priority order (reading at #3)
- `docs/reading.md` — the curriculum, standing list, and reading principles
- `docs/reading-log/` — parallel narrative log
- `docs/schemas/goal-frontmatter.md` — canonical schema (ADR-0012)
