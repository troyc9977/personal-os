---
id: stop-smoking-2026
title: Stop smoking — six-week taper, then maintenance
type: behavioral
status: active
target_date: 2026-06-15
priority: 4
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
  Two failed step-backs in same week -> method revisit (this is the signal that
  cold-turkey-within-taper isn't working and the form needs to change, not that
  willpower needs to increase).

triggers:
  - { description: "Post-work decompression on DCC office days (Mon/Tue/Fri)", note: "highest-frequency window historically" }
  - { description: "Drinks with friends on weekends",                           note: "social, situational" }
  - { description: "Late-night writing or coding push",                         note: "boredom + fatigue + screen" }

daily_tracking:
  metric: cigarettes
  unit: count
  input: tap_increment
  log: []

milestones:
  - { title: "Taper complete (1/day floor held for week 6)", target: 2026-06-15, done: false }
  - { title: "30 days at maintenance",                       target: 2026-07-16, done: false }
  - { title: "90 days at maintenance",                       target: 2026-09-15, done: false }
  - { title: "365 days at maintenance",                      target: 2027-06-15, done: false }
---

# Stop smoking — six-week taper, then maintenance

## Why this matters

Health sits at #4 in the priority order, and smoking is the single largest
multiplier on every other health input — running, sleep, lung capacity,
recovery, the long-arc body. Stopping is also the kind of decision the
identity file directly names: discomfort is often the signal that I'm
working on the right thing.

The taper-then-maintenance shape is honest about what's actually happening.
A clean stop sounds purer but fails more often for me than a structured
descent. The point is to be smoke-free a year from now, not to perform a
single dramatic quit.

## Approach

Six-week linear taper: 6 -> 5 -> 4 -> 3 -> 2 -> 1 cigarette per day, one
step per week, starting May 5. Maintenance from June 16 is one per week
maximum, indefinitely — not zero. Treating "zero" as a binary creates a
cliff where one slip becomes a relapse; treating "one per week" as the
ceiling keeps the slip a slip.

Compass tracks the count daily via tap-increment. The number is the
honest record. No streaks, no quantified-self overlay — same posture as
the meditation floor in ADR-0003.

The slip protocol is explicit and pre-decided so that when a hard week
happens, the response isn't negotiated under pressure: drop to the prior
week's target for 7 days, then resume the descent. Two failures in a
week means the method needs changing, not that I need to try harder.

## Watch-for signals

- Three consecutive over-plan days — triggers the slip protocol, not
  internal monologue.
- Cravings concentrated in one trigger context (e.g. DCC office afternoons).
  Address the context, not the willpower — different walking route home,
  different post-work transition ritual, NRT staged.
- A "bad week" that turns into two. The maintenance ceiling is one per
  week; two weeks at three-plus means maintenance has actually broken.
- Substituting another habit (vape, pouches, etc.) without naming the
  substitution. If a substitution happens, it goes in this file.

## Open

- Whether to bring NRT in at week 4 or earlier. Currently "as needed for
  hard post-work cravings" — may need to be more structured if week 3-4
  proves harder than projected.
- Whether maintenance actually holds as "1/week max indefinitely" or
  whether the right long-term target is zero. Decide after the 90-day
  maintenance milestone, with data.
- What to do about social-drinking triggers on weekends. The taper
  weeks 4-6 are where this gets tested; protocol is unwritten.

## Related

- `docs/decisions/0002-priority-ordering.md` — health at #4
- `docs/projects/habits.md` — interaction with the "no bad habit" daily check
