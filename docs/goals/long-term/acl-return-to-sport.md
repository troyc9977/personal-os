---
id: acl-return-to-sport
title: ACL return-to-sport — squash readiness in 6 weeks
type: physical
status: active
target_date: 2026-06-20
priority: 8
references:
  - docs/decisions/0011-acl-block-priority-over-marathon-phase-1.md
  - docs/decisions/0002-priority-ordering.md
  - docs/decisions/0010-add-gym-to-habits.md
  - docs/projects/habits.md

milestones:
  - { title: "Baseline LSI tested early in block",                                          target: 2026-05-16, done: false }
  - { title: "Phase 2 readiness check — clear or hold league start",                        target: 2026-05-31, done: false }
  - { title: "Squash league starts (target; earliest 2026-05-25)",                          target: 2026-06-01, done: false }
  - { title: "Hop LSI >90% on single / triple / crossover / 6m timed hop",                  target: 2026-06-20, done: false }
  - { title: "Quad LSI >90%",                                                               target: 2026-06-20, done: false }
  - { title: "H:Q ratio >0.6",                                                              target: 2026-06-20, done: false }
  - { title: "ACL-RSI questionnaire clear",                                                 target: 2026-06-20, done: false }
  - { title: "Return-to-play assessment",                                                   target: 2026-06-20, done: false }

phases:
  - { name: "Foundation", weeks: "1-2", dates: "May 9 - May 23",  target: "Lower-amplitude plyos, bilateral. Planned cuts only. Baseline LSI early in block.", long_run: null }
  - { name: "Build",      weeks: "3-4", dates: "May 24 - Jun 6",  target: "Higher-amplitude plyos. 45° -> 90° cuts. Introduce reactive. Begin squash drill exposure Saturdays.", long_run: null }
  - { name: "Sport",      weeks: "5-6", dates: "Jun 7 - Jun 20",  target: "Full reactive agility under fatigue. Sport-specific squash expanding. Return-to-play assessment Jun 20.", long_run: null }

league:
  league_start_target:   2026-06-01
  league_start_earliest: 2026-05-25
  readiness_gate: "Phase 2 clean >=1 week — no knee pain after sessions, 90° cuts solid, reactive intro tolerated"
  weekly_commitments:
    - "Tue PM round robin"
    - "Wed PM house league"

schedule:
  - { day: mon, title: "Lower strength + low-amplitude plyos (~75 min)" }
  - { day: tue, title: "Linear conditioning + change of direction (planned cuts)" }
  - { day: wed, title: "Easy run 6-8km" }
  - { day: thu, title: "Lower strength (unilateral) + high-amplitude plyos" }
  - { day: fri, title: "Reactive agility + sport-specific squash" }
  - { day: sat, title: "Optional squash exposure — drills, light play" }
  - { day: sun, title: "Long run (per marathon plan)" }

sessions_log: []
---

# ACL return-to-sport — squash readiness in 6 weeks

## Why this matters

17 months post-op. Tissue maturation is no longer the limiter; neuromuscular
control under reactive, fatigued, sport-specific load is. Squash is a
front-corner-lunge, deceleration-heavy, rotational-control sport — the exact
patterns the rehab needs to load and the exact patterns the joint has not
yet been asked to perform at game pace.

The squash league has a real start window (target June 1, earliest May 25)
and the return-to-play criteria have a real assessment date (June 20). Both
are sooner and harder-bounded than the October 18 marathon, which is why
ADR-0011 makes this block priority over marathon Phase 1 for these six weeks.
After June 20 the marathon takes the lead again.

## Approach

Six weeks, three two-week phases — Foundation, Build, Sport. Four gym/agility
days (Mon, Tue, Thu, Fri) plus one easy run (Wed) and one long run (Sun).
Saturdays are optional squash exposure, ramping up as Phase 2 and Phase 3
clear.

The structure is the schema's `phases` block plus a new `league` block that
captures the league readiness gate and weekly commitments — see "Open" below
on schema status.

Plyo amplitude and cut complexity scale by phase: bilateral low-amplitude in
Foundation, higher-amplitude and 90° cuts in Build, full reactive under
fatigue in Sport. Physio sign-off is required before each phase steps up
plyos or reactive cuts — that gate is non-negotiable, not a vibe check.

Once the league starts, Tue and Wed become two-a-days (AM session + PM
league night). The plan stays the same; the watch-for signals get sharper.

## Watch-for signals

- Knee pain that persists more than 24 hours after a session. Drop intensity,
  re-test, do not push through.
- Hesitation under reactive cuts. The body knows before the questionnaire
  does; hesitation means the neuromuscular system is not ready and the
  next step waits.
- Fatigue from doubling Tue (AM conditioning + PM round robin) and Wed
  (AM easy run + PM house league). If the AM session feels compromised by
  the previous evening's league, drop AM intensity, do not skip.
- Knee response in the first two weeks of league play. Any swelling or
  pain that lingers — drop to one league night per week.
- Marathon Phase 1 sessions (Wed easy, Sun long) creeping in volume because
  it "feels fine." Phase 1 is paused to 2x/week per ADR-0011 for a reason;
  the budget is here, not there.

## Open

- Whether the schema needs a formal `league` block as a `physical` type-specific
  field, or whether this should be folded into a more general `block`/`return_to_sport`
  shape. Currently authored as a flat `league:` map with the four fields the
  decision specifies. Architect to propose a schema update if a second goal
  ever needs the same shape.
- Phase 1 readiness check on May 31 may either clear league start for June 1
  or hold to the earliest-allowed May 25 + a week's grace. Decision date is
  May 31; do not pre-decide.
- Whether to add NRT-style structured rest (a real off-day in the middle
  of the week) once league two-a-days start. Currently the structure assumes
  Sat optional and Sun long-run is "rest enough" — re-evaluate after week 4.

## Related

- `docs/decisions/0011-acl-block-priority-over-marathon-phase-1.md` — the trade-off this goal embodies
- `docs/decisions/0002-priority-ordering.md` — health at #4
- `docs/decisions/0010-add-gym-to-habits.md` — gym is the daily-accountability layer for the strength side of this block
- `docs/goals/long-term/toronto-half-2026.md` — the marathon plan whose Phase 1 is paused to make room
- `docs/projects/habits.md` — daily habit interaction
