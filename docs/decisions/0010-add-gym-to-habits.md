# 0010: Add gym to tracked habits — habits go from 4 to 5

## Status

Accepted — 2026-05-05

Amends ADR-0005 (Daily / Weekly / Habit / Goals tracking system).

## Context

ADR-0005 established four daily habits: meditation, run, stretching, no_bad_habit. The ADR explicitly noted: *"Don't add new habits without removing one or proving the existing four are stable for at least a month."*

May 5, 2026: the existing four habits are NOT stable. Daily entries May 4 and May 5 show no habits ticked. Marathon training plus ACL recovery context makes gym (strength + balance work) genuinely necessary, not optional. And gym is currently in `routines.md` (Mon/Tue/Fri) but not in the habit tracker, which means it has no daily accountability.

## Decision

- Add `gym` as the fifth tracked habit. Target: 3x/week (Mon, Tue, Fri).
- The five habits are now: **meditation, run, gym, stretching, no_bad_habit**.
- On non-run days that are gym days (Mon, Fri), gym appears as a daily task in addition to the habit checkbox.
- Stretching stays. Strength work and mobility work are different practices; consolidating them would lose information.

## Rationale for breaking the original rule

The "don't add without removing or stabilizing" rule was anti-bloat. The intent: prevent the habit list from sprawling into a quantified-self overlay.

Gym is not bloat. It is:
- A substantial discipline with its own time and place (Mon/Tue/Fri at noon)
- Critical to ACL-aware marathon training (strength supports the running ramp)
- Already in `routines.md` and already happening sometimes

Adding it makes the habit tracker reflect reality. Refusing to add it because the rule says so would be the substrate failing its purpose.

## Consequences

### Positive
- Gym now has daily accountability.
- ACL-aware training fully represented in the substrate (run + gym + stretching + the marathon goal file).
- Honest acknowledgment that 5 disciplined habits is what the current life requires.

### Negative
- Daily ask grows from 4 ticks to 5. Marginal friction increase.
- The "minimal habits" principle from ADR-0005 takes a hit. If the habit list drifts to 6 or 7 over the next year, that's a signal something is wrong.

### Neutral
- `habits.md` and ADR-0005 both need inline edits to reflect the new five.
- Compass UI already accommodates the change — habit checkboxes are a list, the list now has 5 items.

## Alternatives considered

- **Replace stretching with gym**: rejected. Strength and mobility are different; both useful.
- **Hold at 4 habits, gym as scheduled task only**: rejected. Tasks die without habit-tier accountability.
- **Wait until existing four stabilize for a month**: rejected. ACL recovery wants gym now; six-week delay loses real fitness ground.

## Watch-for

- Habit list growing past 5 within 6 months → ADR-0005's anti-bloat concern was right; revisit.
- One of the five consistently failing for 4+ weeks → consolidate or restructure rather than ignoring.

## Related

- `docs/decisions/0005-tracking-system.md`
- `docs/projects/habits.md`
- `docs/routines.md`
- `goals/long-term/toronto-half-2026.md`
