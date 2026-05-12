---
id: screenplay-may-21
title: Short film script — outline to polish in 23 days
type: creative
status: active
priority: 6
created_at: 2026-05-10
target_date: 2026-05-31
references:
  - docs/decisions/0002-priority-ordering.md
  - docs/decisions/0014-ridingpulse-pivot.md
  - docs/identity.md

milestones:
  - { title: "Beat sheet complete",                                target: 2026-05-13, done: false }
  - { title: "Detailed sequence outline",                          target: 2026-05-17, done: false }
  - { title: "Draft 50% (mid-checkpoint)",                         target: 2026-05-22, done: false }
  - { title: "Draft complete",                                     target: 2026-05-27, done: false }
  - { title: "Revision complete",                                  target: 2026-05-30, done: false }
  - { title: "Final polish — screenplay done",                     target: 2026-05-31, done: false }

phases:
  - { name: "Outline", weeks: "1",                dates: "May 12 - May 17", target: "Beat sheet (May 13), detailed sequence outline (May 17). No prose yet." }
  - { name: "Draft",   weeks: "2",                dates: "May 18 - May 27", target: "First draft to FADE OUT. 50% mid-checkpoint May 22; complete May 27. Get there ugly if needed." }
  - { name: "Revise",  weeks: "3",                dates: "May 28 - May 30", target: "Structural and dialogue passes. Cut, sharpen, condense." }
  - { name: "Polish",  weeks: "3 — May 31 only",  dates: "May 31",          target: "Final read; format clean; done." }

schedule:
  - { day: mon, title: "Screenplay session (~1.5 hr, evening)" }
  - { day: tue, title: "Screenplay session (~1.5 hr, evening)" }
  - { day: wed, title: "Screenplay session (~1.5 hr, evening)" }
  - { day: thu, title: "Screenplay session (~1.5 hr, evening)" }
  - { day: fri, title: "Screenplay session (~1.5 hr, evening)" }
  - { day: sat, title: "Screenplay heavy creative block (morning)" }
  - { day: sun, title: "Screenplay heavy creative block (morning)" }

sessions_log: []
---

# Short film script — outline to polish in 23 days

> **Note on slug:** the file is named `screenplay-may-21` for cross-reference
> stability after the 2026-05-12 push. The actual target date is 2026-05-31.
> Slug preserved; do not rename. If the deadline pushes again, write the
> drift here rather than renaming.

## Logline

_TODO: Troy to fill in the logline before drafting begins._

## Why this matters

The cultural-output cylinder of the 25-year project has been deliberately
dormant since RidingPulse took over the calendar (per `identity.md`). A
short sprint to a 5-15 page short film script doesn't reverse that — it
keeps the muscle alive while the dormancy continues. Filmmaking by
formation; the formation does not stay sharp through 18 months of zero
practice.

This is also a deliberate test of whether short-horizon creative work can
fit the available windows (decompression evenings, weekend mornings)
without eating the RidingPulse time the week actually requires.

## Approach

23 days, four phases — Outline, Draft, Revise, Polish. ~1.5 hours/day target.
Heavy creative work (outlining, drafting from cold) goes in weekend
mornings. Typing into an existing scene, dialogue revision, formatting —
weeknight 8:00-9:30 PM windows. The sprint is short on purpose: long
enough to finish a thing, short enough that perfectionism doesn't have
room to bloom.

The logline lives at the top of this file as a placeholder until Troy
writes it. Drafting starts after the beat sheet, not after the logline
is "right."

## Watch-for signals

- Eating RidingPulse build/publication time. With ADR-0014's pivot, the
  June 30 tool MVP and the June 30 first Substack piece both sit
  immediately downstream of this sprint. If those slip because the
  screenplay ate the evenings, the trade was wrong. Substrate-as-avoidance
  check applies.
- Heavy gym days (Mon and Thu, per the ACL block) leaving zero brain for
  evening writing. If this is the pattern, lean weekend mornings harder
  rather than forcing weeknight sessions on dead reserves.
- Perfectionism on the first draft. The Draft phase ends at FADE OUT,
  not at "good." Revise is for "good." Polish is for "shipped." Don't
  collapse the phases.
- Mid-sprint check (May 25) showing fewer than 5 pages. Either the script
  is shorter than expected (acceptable) or the schedule is slipping
  (diagnose: time, energy, or block?). Don't let May 25 quietly pass
  without naming which.
- The sprint extending past May 31 "just to make it good." That's the
  failure mode this format is designed to prevent. Ship at 31, even
  imperfect; if a real second pass is wanted later, that's a separate
  goal file.

## Open

- Length target 8-10 pages (short film, 8-10 min). Deadline pushed +10 days to free capacity for RidingPulse pivot work (ADR-0014).
- Deadline pushed by 10 days (from 2026-05-21 to 2026-05-31) to free
  capacity for RidingPulse pivot work in the week following the
  2026-05-12 decision. See ADR-0014. The slug `screenplay-may-21` is
  intentionally preserved for cross-reference stability — future-Troy:
  the "may-21" in the filename is historical, the body is the source of
  truth on the actual date.
- The logline. Troy writes this before the May 20 outline session begins.
- Final page count target. Spec says 5-15 pages; the beat sheet on May 20
  is the natural moment to commit to a number.
- Whether anything from this sprint feeds the longer-arc filmmaking project
  (currently paused per `identity.md`). Decide after May 31 with the
  finished script in hand, not before.

## Related

- `docs/decisions/0002-priority-ordering.md` — writing/creative output at #6
- `docs/decisions/0014-ridingpulse-pivot.md` — the pivot that pushed this sprint by 10 days
- `docs/identity.md` — filmmaking as the cultural-output cylinder, currently dormant
