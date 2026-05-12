---
id: toronto-half-2026
title: Toronto Waterfront Half Marathon (with full-marathon stretch)
type: physical
status: active
priority: 4
created_at: 2026-05-09
target_date: 2026-10-18
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
  - { title: "Register for Toronto Waterfront Half", target: 2026-05-10, done: true }
  - { title: "Base build complete (25 km/wk, long run 10 km)", target: 2026-06-14, done: false }
  - { title: "Aerobic block complete (35 km/wk, long run 16 km)", target: 2026-07-26, done: false }
  - { title: "August half (decision point on full upgrade)", target: 2026-08-16, done: false }
  - { title: "Long run peaks (22 km half / 32 km full)", target: 2026-09-06, done: false }
  - { title: "Race day", target: 2026-10-18, done: false }

phases:
  - { name: "Base build",       weeks: "1-6",   dates: "May 5 - Jun 20",  target: "Paused to 2 runs/week (Wed easy + Sun long) May 9 - Jun 20 per ADR-0011 (ACL block priority). Was 4 easy runs/week, 15 -> 25 km/wk.", long_run: "to ~10 km, 2x/week schedule" }
  - { name: "Aerobic dev",      weeks: "7-13",  dates: "Jun 21 - Aug 8",  target: "Re-entry from ~14 km/wk base (vs originally planned ~25 km/wk). Extended by 1 week to absorb the lower entry point. 4-5 runs/week, 1 tempo, peak 30-35 km/wk.", long_run: "to ~16 km" }
  - { name: "Half-specific",    weeks: "14-19", dates: "Aug 9 - Sep 20",  target: "4-5 runs/week, race-pace work, peak 35-40 km/wk", long_run: "peaks ~22 km" }
  - { name: "Sharpen / decide", weeks: "20",    dates: "Sep 21 - Sep 27", target: "Compressed to 1 week (was 3) to preserve race window. Mild taper if half; long-run focus if upgrading.", long_run: "peak ~32 km if full" }
  - { name: "Race window",      weeks: "21-24", dates: "Sep 28 - Oct 18", target: "final taper", long_run: null }

schedule:
  - { day: wed, title: "Easy run 6-8km" }
  - { day: sun, title: "Long run" }

sessions_log: []
---

# Toronto Waterfront Half Marathon (with full-marathon stretch)

## Why this matters

Health is priority 4 per ADR-0002, and running is the cardio base that holds
the whole stack up — weight, mental clarity, embodiment, the morning that
isn't just a screen. A dated race is the only thing that reliably converts
"running" from a habit into a project. Toronto Waterfront on October 18 is
six months out from the start of the base build, which is the right amount
of runway for somebody currently at 2-3 runs/week trying to get back to four.

The half is the honest target. The full-marathon stretch exists because by
August I'll know whether the knee, the consistency, and the volume are
actually there — and if they are, the upgrade cost at registration is small
relative to the year of training I'll already have done.

## Approach

Six phases, twenty-four weeks. Easy mileage builds the engine; one tempo
adds threshold work from phase 2; Sunday long runs accumulate the
aerobic depth the race needs. The phase block in the frontmatter is the
contract with the weekly pool — Sunday setup pulls specific numbers from
the current phase, not from ambition.

The stretch decision is rule-based, not vibe-based. The August half-marathon
test is the data point. If any of the three conditions fail, I run the half
I trained for and don't second-guess it.

**Phase 1 amendment (ADR-0011, May 9, 2026).** Phase 1 is paused to 2 runs/week
(Wed easy + Sun long) from May 9 to June 20 to make room for the ACL
return-to-sport block. Phase 2 starts June 21 instead of June 15 and extends
by one week to absorb the lower entry base (~14 km/wk vs ~25 km/wk planned).
Phase 4 (Sharpen / decide) compresses from 3 weeks to 1 to preserve the race
window. Race day stays October 18. Sub-1:55 stretch becomes harder; the
finish goal remains robust.

## Watch-for signals

- Two consecutive weeks below 3 runs. The base requires 4 to actually build;
  3 holds; 2 erodes. If 2 happens twice in a row, look at the rest of life.
- Knee pain that lasts past the next rest day. Phase the volume back, don't
  push through.
- Long run skipped two Sundays running. Sunday is the keystone session;
  losing it is losing the phase.
- Pace drifting upward on easy runs (i.e. easy days getting hard). Usually
  means cumulative fatigue or under-sleeping, not under-fitness.
- August half time materially worse than 1:55 — the stretch is off, full stop.

## Open

- Knee status under combined ACL block + 2x/week running through June 20. If
  the combined load is poorly tolerated, the Sun long run gets cut before the
  Wed easy.
- Whether the compressed 1-week Sharpen phase (Sep 21-27) is enough taper-prep
  if the August half decision pushes upgrade-to-full. If the upgrade triggers,
  re-evaluate compressing the Race window taper instead.
- Whether the mid-August half decision point slips 1-2 weeks given the
  shifted Phase 2 ramp. Hold the date for now; revisit at end of Phase 2.
- Whether to add a strength/stretching block formally to the plan, or keep
  it under the existing habits target. Currently the latter — and the ACL
  block file (`acl-return-to-sport.md`) is doing the strength work explicitly
  through June 20.
- Race-day pace target. Set during phase 3 once threshold work has data
  behind it. Don't pick a number now.

## Related

- `docs/decisions/0002-priority-ordering.md` — health at #4
- `docs/decisions/0011-acl-block-priority-over-marathon-phase-1.md` — the trade that paused Phase 1 to 2x/week
- `docs/goals/long-term/acl-return-to-sport.md` — the priority block May 9 - Jun 20
- `docs/projects/habits.md` — the running habit lives here
- `docs/goals/2026.md` — year-level context
- `docs/goals/2026-Q2.md` — quarter-level context
