# 0011: ACL block takes priority over marathon Phase 1, May 9 - Jun 20

## Status

Accepted — 2026-05-09

## Context

Two health commitments have been competing for the same May/June recovery
budget. The marathon Phase 1 base build calls for 4 easy runs/week ramping to
~25 km/wk (per the original `toronto-half-2026.md` plan, weeks 1-6). The ACL
return-to-sport block — 17 months post-op, neuromuscular control is the
limiter — calls for 4 gym/agility days/week (Mon, Tue, Thu, Fri) plus, once
the squash league starts, two evening league nights (Tue and Wed).

The two stack badly. Tue would be AM linear conditioning + change of
direction *and* PM round robin *and* an "easy" run somewhere. Wed would be
PM house league *and* the marathon's mid-week easy run. Thu and Fri are
already gym/agility. The result of trying to do both as written would be
chronic fatigue, a compromised AM session quality on league days, and a
real re-injury risk under reactive load.

The deadlines are also asymmetric. The marathon target (October 18) is
five months out and forgiving — base mileage can be re-built from a lower
floor with extended phases. The squash deadlines are sooner and harder:
return-to-play criteria assessed June 20, league start window May 25 (earliest)
to June 1 (target). Missing the league window means missing this season,
which is the entire point of returning to the sport.

The substrate-as-avoidance check applies the other way around here: writing
about the conflict without resolving it would be the failure mode. The
resolution is a temporary, dated, written trade.

## Decision

For the six-week window May 9 - June 20, 2026, the ACL return-to-sport block
takes priority over marathon Phase 1.

- Marathon Phase 1 eases from 4 runs/week to 2: Wed easy + Sun long.
- The Tue easy and Thu tempo slots are dropped for this window.
- ACL block runs as written (Mon, Tue, Thu, Fri gym/agility + Sat optional
  squash exposure), with Tue/Wed becoming two-a-days once the league starts.
- On June 20, the ACL block ends, and the marathon resumes leadership for
  the remaining ~17 weeks of training.

The trade is dated. After June 20 the marathon takes priority back. ACL work
continues but as maintenance — strength and stretching rolled into the
existing habits, not a dedicated block.

## Consequences

### Positive

- Squash readiness gets the recovery budget it actually needs. Reactive
  cuts and plyo progressions don't share fatigue with mid-week running
  volume.
- The asymmetric-deadline logic is honored: the harder-bounded constraint
  (squash window) gets the bandwidth, the more forgiving one (October
  marathon) absorbs the slack.
- Phase 1 minimum dose preserved. 2 runs/week (Wed easy + Sun long) keeps
  the long run alive — which is the keystone session — and keeps an aerobic
  touchpoint mid-week. The base does not go to zero.

### Negative

- Marathon Phase 2 enters at ~14 km/wk base instead of the planned ~25 km/wk.
  The aerobic block must absorb a lower starting point.
- Phase 2 extends by one week (now 7 weeks, ending August 8) to give the
  ramp room. Downstream phases compress: the Sharpen/decide phase shrinks
  from 3 weeks to 1, ending September 27 ahead of the unchanged race window.
- Sub-1:55 stretch becomes meaningfully harder. The August half decision
  point may slip 1-2 weeks. The finish goal — the actual goal — remains
  robust.
- Two-a-day Tue/Wed introduces real fatigue risk once the league starts.
  Watch-for signals are in `acl-return-to-sport.md`.

### Neutral

- The ADR is dated, not standing. June 20 is the explicit reversion date.
  If the ACL block extends — re-injury, missed phase, league delayed — the
  reversion gets re-decided in writing, not drifted.
- ADR-0010 (gym added to habits) already aligned the daily-accountability
  layer with this kind of strength-heavy block. No further habit-tracker
  change required.

## Alternatives considered

- **Compressed 3-day ACL block** so all four runs and the four agility days
  fit. Rejected. Neuromuscular work needs spacing for adaptation; compressing
  raises re-injury risk on the side that matters most. The whole reason the
  block exists is that the joint is the limiter.
- **Marathon-priority, ACL block as auxiliary.** Rejected. The squash-ready
  window (return-to-play criteria + league start) is the harder-bounded and
  sooner constraint. Marathon time is recoverable; missing the league season
  is not.
- **Pause marathon Phase 1 entirely (zero runs/week).** Considered, rejected.
  The Sunday long run is the keystone session and giving it up for six weeks
  would force Phase 2 to start from a much worse base. 2x/week is the
  minimum-viable Phase 1.
- **Drop the squash league for this season.** Rejected. The league is the
  only forcing function for actually playing under reactive game conditions.
  Squash without league play is drill-only, which doesn't test what return-
  to-sport actually means.

## Review

This ADR gets revisited at:

- **May 31, 2026**: Phase 2 readiness check. ACL block clear or hold league start?
- **June 20, 2026**: ACL block end. Marathon resumes leadership. Document the
  state of both goals at handoff.
- **August 16, 2026**: stretch-goal decision date for the marathon. The
  combined-load consequences should be visible by then.

## Related

- `docs/goals/long-term/acl-return-to-sport.md` — the priority block May 9 - Jun 20
- `docs/goals/long-term/toronto-half-2026.md` — the marathon plan whose Phase 1 eases
- `docs/decisions/0002-priority-ordering.md` — health at #4 (both goals sit under it)
- `docs/decisions/0010-add-gym-to-habits.md` — the habit-layer alignment for strength work
