# 0009: Substack launch timeline — revision

## Status

Accepted — 2026-05-05

Supersedes the launch-timing portion of ADR-0004. ADR-0004's preconditions framework remains useful but the date and form change.

## Context

ADR-0004 set Sep-Oct 2026 as the Substack launch window with three preconditions: ~300 X followers, 3-5 backlog pieces drafted, and at least one piece on the decline-of-the-West essay started.

After two months, the honest read of the substrate is different from what ADR-0004 anticipated:

- The X following is at 100, not 300. Reaching 300 by September is achievable but tight.
- Backlog drafting hasn't started materially.
- The decline-of-West piece is still circling.
- The original framing — Substack as the home, with biweekly cadence — places a lot of weight on the substack-itself-as-vehicle. That doesn't match the actual ambition.

The deeper goal is not "ship a Substack with a backlog." It's to publish a real piece in a serious external venue (Comment Magazine as the named first target per `projects/substack.md`) and use the Substack as the home around it.

## Decision

- **Substack launch shifts to November 2026.** Aligned with first publishable piece in an external venue, rather than as a standalone vehicle launch.
- **Primary milestone**: first piece published in an external venue (target: Comment Magazine or similar), by November 30, 2026.
- **Substack opens around the publication**, not before. The Substack home page exists at launch but the first post is the published-piece announcement or a companion essay.
- **X-follower precondition revised**: 400 by September 15, 2026 (revised from 300 by September 1). Slightly higher target, slightly later deadline.
- **Backlog reframed**: 3-5 drafts in the pipeline at Substack launch, not "ready to post weekly." Quality over cadence.
- **Cadence post-launch**: revisit at launch. Biweekly may be too aggressive given total commitments; monthly may be the honest cadence.

## Consequences

### Positive
- Two additional months for the decline-of-West piece to mature.
- "First publication in external venue" is a different, more rigorous discipline than "biweekly blog cadence."
- Substack as venue-companion-not-primary reduces the daily/weekly content pressure.

### Negative
- The launch slips by ~6 weeks. ADR-0004's anti-drift logic (preconditions, not dates) still applies — but a launch that slips repeatedly is its own problem and should be watched.
- Aligning Substack with an external publication couples two separate workstreams. If Comment doesn't accept, the Substack-launch trigger has to fall back to "post the piece on Substack myself by Nov 30."

### Neutral
- The biweekly post-launch cadence question stays open until launch.
- Q2 commitments (decline-of-West outline by May 31, section 1 by June 30) remain unchanged — those are the path-of-least-regret regardless of where the piece lands.

## Alternatives considered

- **Hold the original Sep-Oct launch with the original 300-follower precondition**: rejected. Forces a launch that the substrate isn't actually ready for; produces a weak debut.
- **Drop the external-publication target**: rejected. The external venue is the rigor that prevents the Substack from becoming a private blog.
- **Push to Q1 2027 entirely**: considered. Rejected because November is achievable with the Q2 commitments held; pushing into 2027 risks indefinite slip.

## Review

Revisited at:
- **End of August 2026**: launch readiness — preconditions met, piece in submission with Comment, decision-point reached.
- **End of November 2026**: post-launch — did it actually launch, what cadence is realistic.

## Related

- `docs/decisions/0004-substack-launch-preconditions.md` (superseded portion)
- `goals/long-term/substack-2026.md`
- `projects/substack.md`
