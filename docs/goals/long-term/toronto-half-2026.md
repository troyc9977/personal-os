---
id: toronto-half-2026
title: Toronto Waterfront Half Marathon (with full-marathon stretch)
type: physical
status: active
target_date: 2026-10-18
priority: 4
references:
  - docs/decisions/0002-priority-ordering.md
  - docs/goals/2026.md
  - docs/goals/2026-Q2.md
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
  - { name: "Base build",      weeks: "1-6",   dates: "May 5 - Jun 14",  target: "4 easy runs/week, 15 -> 25 km/wk", long_run: "to ~10 km" }
  - { name: "Aerobic dev",     weeks: "7-12",  dates: "Jun 15 - Jul 26", target: "4-5 runs/week, 1 tempo, peak 30-35 km/wk", long_run: "to ~16 km" }
  - { name: "Half-specific",   weeks: "13-18", dates: "Jul 27 - Sep 6",  target: "4-5 runs/week, race-pace work, peak 35-40 km/wk", long_run: "peaks ~22 km" }
  - { name: "Sharpen / decide", weeks: "19-21", dates: "Sep 7 - Sep 27",  target: "mild taper if half; long-run focus if upgrading", long_run: "peak ~32 km if full" }
  - { name: "Race window",     weeks: "22-24", dates: "Sep 28 - Oct 18", target: "final taper", long_run: null }

schedule:
  - { day: tue, title: "Easy run" }
  - { day: thu, title: "Tempo run (from phase 2)" }
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

- Knee status pre-base. Not yet stress-tested at base-build volume; the
  first two weeks of phase 1 are the real diagnostic. If it flares,
  phase 1 extends rather than phase 2 starting on time.
- Whether to add a strength/stretching block formally to the plan, or keep
  it under the existing habits target. Currently the latter.
- Race-day pace target. Set during phase 3 once threshold work has data
  behind it. Don't pick a number now.

## Related

- `docs/decisions/0002-priority-ordering.md` — health at #4
- `docs/projects/habits.md` — the running habit lives here
- `docs/goals/2026.md` — year-level context
- `docs/goals/2026-Q2.md` — quarter-level context
