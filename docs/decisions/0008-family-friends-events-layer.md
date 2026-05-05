# 0008: Family and friends — events-and-tasks layer, not goal-file form

## Status

Accepted — 2026-05-05

## Context

Family and friends sit at priority 2 in ADR-0002, above reading, health, contemplation, writing, and DCC. The personal-OS substrate authors structured goal files for priority commitments — schedules, milestones, watch-for signals, sessions logs.

A goal file for family-and-friends would specify recurring contact ("Sunday call with mom"), milestones ("visit parents X times in 2026"), and tracking. The question is whether that shape fits the underlying commitment.

## Decision

The family-and-friends commitment is real and binding, but is NOT operationalized through a goal file. Instead:

- **Events / calendar**: planned dinners, calls, visits, trips home — surface as dated commitments alongside other appointments.
- **Tasks**: specific outreach ("call mom Sunday", "text Erica re: dinner") added to the daily/weekly task system as needed.
- **`projects/family-friends.md`**: keeps its meta-discipline shape (monthly people.md update, drift signals).
- **`docs/people.md`**: continues to hold relational context.

The substrate treats relationships as ongoing commitments that resist scheduling-as-training, not as goals with milestones to hit.

## Consequences

### Positive
- Relationships avoid being shoehorned into a structure built for skill-build and behavior-change goals.
- The flexibility-and-presence character of family/friend time is preserved.
- Existing meta-discipline (monthly people.md update, drift signals) already handles the long-arc layer.

### Negative
- Priority 2 is operationalized through a different mechanism than priorities 1, 3, 4, 5, 6. Slight inconsistency in how the substrate treats commitment levels.
- Risk: relationships erode quietly without goal-file discipline. Mitigated by the watch-for signals already in `projects/family-friends.md` and by the upcoming Compass calendar surface making events prominent.
- A future-me reading this might wonder why priority 2 has no goal file. This ADR exists to answer that.

### Neutral
- The Compass `Upcoming` card and `Today's commitments` section will surface family/friend events alongside everything else, giving the priority real visibility without forcing a goal-shape.

## Alternatives considered

- **Author a family-and-friends goal file with schedule and milestones**: rejected. Relationships should not be scheduled like training plans; checkbox compliance is not the relationship.
- **Drop family-and-friends from priority 2**: rejected. The priority is real, just operates through a different layer.
- **Author a "relational discipline" goal file** (e.g., "monthly outreach to drifted-from list"): considered. The current `projects/family-friends.md` already does this; replicating in goal-file form would be redundant.

## Related

- `docs/decisions/0002-priority-ordering.md` (priority 2)
- `projects/family-friends.md`
- `docs/people.md`
