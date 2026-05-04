# 0004: Substack launch preconditions

## Status

Accepted — 2026-05-03

## Context

The Substack launch has been targeted for September-October 2026. Without explicit preconditions, "launch" tends to slip indefinitely — there is always a reason to delay one more month, draft one more piece, build one more bit of audience.

The honest version of what the launch requires has not been written down. This ADR fixes that.

## Decision

The Substack launches publicly when, and only when, all three of the following are true:

1. **~300 X followers** built through real engagement, not bot or paid acquisition. The number is approximate; the substance is real audience that would actually click through to a Substack.
2. **3-5 backlog pieces drafted** so the first weeks of public posting have meaningful content rather than starting from a blank page under launch pressure.
3. **At least one piece on the decline-of-the-West essay** in some draft form, even rough. This is the long-circling piece, and starting it at any depth before launch is itself the discipline.

If these are not met by the September 2026 target, the launch shifts. Not the other way around. I do not want to launch publicly with thin material and an audience of zero, because the launch becomes a one-time event and the failure to land sticks.

## Consequences

### Positive
- The launch date stops being an arbitrary calendar event and becomes the consequence of the work being done.
- Each precondition is independently meaningful — the X following is real, the backlog is real, the long-circling piece getting started is real. None of them is busy work.
- The ADR provides a clean "no" to anyone (including future-me) who suggests launching earlier without the conditions met.

### Negative
- The launch may slip past September 2026 if the X following is slower than hoped. I accept this. Launching to no audience is worse than launching late.
- The 300-follower number is somewhat arbitrary. The honest answer is "enough that the first post gets meaningful engagement." 300 is a defensible threshold; it could be 200 or 500 with similar logic.

### Neutral
- This ADR makes the X-building a real strategic precondition rather than a side activity. I should plan time for it accordingly — 2 tweets per day on writing days, with attention to what is actually building audience vs. shouting into the void.

## Alternatives considered

- **Launch with no preconditions; build audience post-launch.** Rejected. The case for this is "shipping anything is better than waiting for perfect," which is true in software but less true in writing where the first impression matters. A weak launch is harder to recover from than a slightly-late strong one.
- **Higher follower threshold (1000+).** Rejected. Probably right for some kinds of writers, but 300 is enough to meaningfully engage with each post and grow organically from there.
- **No follower threshold; just have backlog.** Rejected. A backlog without an audience is a private writing exercise. The public launch needs an audience that exists.

## Review

This ADR gets revisited at:
- **End of June 2026**: is the X following on track? Are pieces being drafted? Has the decline-of-the-West essay been started?
- **End of August 2026**: launch readiness check. If preconditions are met, lock the September date. If not, push to October or beyond and write a follow-up ADR explaining why.

## Related

- `docs/projects/substack.md` — the full project file
- `docs/identity.md` — long-arc commitments including the Substack track
- `docs/decisions/0002-priority-ordering.md` — writing's position in the priority order
