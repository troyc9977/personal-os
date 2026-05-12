# 0014: RidingPulse pivot — audience-led, tool-first

## Status

Accepted — 2026-05-12

Partially supersedes ADR-0009 on timing: the November 2026 Substack launch
target is replaced by 2026-06-30. ADR-0009's quality framing (external venue as
rigor, drafts before launch) is preserved.

## Context

The WardForge thesis was a municipal-MVP wedge followed by provincial and federal
expansion. Customer outreach kicked off in earnest: cold emails to potential
clients, a founders' agreement drafted with Matthew, prospecting conversations
started.

The validation came back, but not the way the original plan assumed. Cold
outreach to municipal clients is the same lift every time — each email is a
fresh cold start, no compounding, slow feedback loop, and high friction on both
sides of the conversation. After running this long enough to read the pattern
clearly, the answer was visible: customer-first GTM doesn't compound here.
What does compound is writing.

The analytical instincts and political knowledge that would theoretically inform
a sales pitch to a campaign manager are the same instincts that produce good
published analysis. Publishing accumulates. An audience built around credible
political analytics creates distribution for the product that cold email never
will. The flywheel is: write using the tool → build audience → audience creates
credibility → credibility creates product distribution and eventually revenue.
Customer-first GTM has no equivalent loop.

The technical work to date is not wasted. The analytics platform is real and
the thesis about Canadian political data is still sound. What changes is the
order: build the tool for personal use, publish analysis publicly, let the
audience determine the monetization shape rather than front-loading sales effort
to validate a product that isn't mature yet.

## Decision

Rebrand WardForge as RidingPulse.

- **Public-viewer tool launch 2026-08-01** at `ridingpulse.ca`. This is the
  concrete target; "next several months" is no longer the framing.
- **V1 scope is lobbying-only across Toronto and Federal jurisdictions.**
  Ontario provincial data and contributions data are deferred to v1.5 with no
  committed date. The narrowing is intentional — coverage breadth is traded for
  shipping on time with quality data.
- **V1 tech stack is locked** at this ADR level:
  - MapLibre GL JS + Martin (PostGIS vector tiles) + deck.gl overlays
  - Four zoom tiers: Country / Province / Riding / Neighbourhood
  - Permanent dark theme
  - Chakra Petch (display) + Inter (body)
  - Supabase Auth, public-viewer tier only — no campaign tier in v1
  Reversing any of these decisions mid-build is costly. The lock is real, not
  advisory.
- **311 live request feed is a stretch goal.** Kept if everything else stays on
  track; dropped if anything falls behind. It does not gate the Aug 1 launch.
- **Publishing under Troy Campbell's own byline.** First piece 2026-06-30;
  biweekly cadence thereafter. Publication name TBD, defaults to Troy Campbell.
  ADR-0009's quality constraint — publish pieces worth reading, not filler —
  carries forward unchanged.
- **First piece angle**: specific recent case tied to news; specific case
  selected by 2026-05-17 per the `substack-2026` goal. The decision shape is
  set here (a case, tied to news, surfaced through the tool) so future-Troy
  doesn't relitigate "what was the first piece supposed to be" — only which
  case.
- **Decline-of-West essay parked as a future piece.** The existing outline
  (thesis + 5-section structure) is preserved in May daily entries. It is held
  in rotation, not the first piece. Re-engage when biweekly cadence is
  established and rotation room exists.
- **Matthew's role is async sounding board** through the current personal-build
  phase — reads what ships, gives feedback when he has time. Full engagement
  re-opens at scale-up. This is a sharper read of where the relationship
  actually sits than "part-time helper." Strategy call 2026-05-13 to align on
  the pivot. The founders' agreement (50/50) is still pending signature and
  should be re-papered to reflect the new direction before it is signed.
- **BC Conservatives 2028 partnership target**: deferred indefinitely. Re-engage
  when the product has matured and an audience exists to make that conversation
  credible.
- **Substack accelerates**: the 2026-06-30 target replaces the November 2026
  target from ADR-0009. The first content publishes from the tool, not around
  an external-venue placement.

## Consequences

### Positive

- The compounding mechanism is aligned with Troy's demonstrated strength.
  Publishing analytical content is a skill already developed; the customer-
  outreach loop was not producing equivalent returns per hour.
- Substack timeline accelerates ~5 months. Earlier publishing means earlier
  feedback on whether the analytical angle resonates.
- Technical platform work is preserved and redirected. Nothing built for
  WardForge is wasted; it now serves personal-use analysis rather than a
  sales demo.
- Tech stack lock (MapLibre/Martin/deck.gl, Supabase Auth, dark theme, Chakra
  Petch/Inter) reduces decision surface area through Aug 1. The build phase has
  a clear target, not an open-ended spec conversation.
- Monetization decision deferred to a point of better information — audience
  size, engagement data, product maturity — rather than committed up front.

### Negative

- The customer-outreach goal sunsets. Effort invested in cold prospecting does
  not convert into near-term revenue. This is a real cost, not just a reframing.
- V1 scope cut (lobbying-only, Toronto + Federal) is a real narrowing. Ontario
  provincial and contributions data are deferred to v1.5 with no committed date.
  The product that ships Aug 1 is narrower than the original thesis.
- Tech stack lock is also a real constraint. MapLibre/Martin/deck.gl are chosen;
  reversing any of those mid-build is costly. If a chosen component proves
  wrong, the fix is expensive.
- The Decline-of-West essay outline — months of prior thinking — doesn't unblock
  the June 30 piece. That work is not lost, but it is parked. The June 30 piece
  needs its own angle.
- Matthew's role reframing from "part-time helper" to "async sounding board" is
  the honest description, but it also narrows the collaborative surface during
  the build phase. The founders' agreement re-papering before signing remains a
  watch item; unsigned-agreement drift is a real risk.
- BC Conservatives 2028 target deferred indefinitely. If the product doesn't
  mature fast enough, that window may close without the conversation happening.
- Audience-led GTM is slower to revenue than a closed B2B sale would be if
  customer outreach had worked. The bet is that it compounds faster than it
  would have; that thesis is unvalidated.

### Neutral

- The project file moves from `wardforge.md` to `ridingpulse.md`. The architect
  is authoring the new file in parallel with this ADR.
- ADR-0009's quality framing — publish pieces worth reading, not filler —
  carries forward unchanged. The audience-led model makes that constraint more
  important, not less.
- Monetization model remains genuinely open. No decision is made here; that
  decision gets its own ADR when the data warrants it.

## Alternatives considered

- **Push through with municipal MVP and customer outreach**: the friction and
  feedback lag were the actual data. Each cold email was the same lift as the
  last. Rejected — the pattern was visible enough to act on.
- **Full abandonment of political-analytics direction**: wastes real technical
  work and a thesis that is still sound. The platform and the analytical angle
  are worth preserving; only the go-to-market is changing. Rejected.
- **This pivot — audience-led, tool-first**: bets on Troy's writing as a leading
  indicator, preserves the technical platform, defers monetization to a point
  of better information. Accepted.

## Review

Revisited at:

- **2026-06-30**: first piece published or not. If not, the acceleration claim
  is already failing — document why.
- **2026-09-30**: three months of publishing rhythm. Is the audience building?
  Is the analysis landing? Is the tool producing content worth reading at
  consistent intervals? Is Aug 1 launch holding or has it slipped?
- **2026-12-31**: year-end read on whether audience-led is compounding as
  theorized or plateauing. Monetization model re-opened at this point.

## Related

- `docs/decisions/0002-priority-ordering.md` — priority order; RidingPulse sits
  under the existing framework
- `docs/decisions/0009-substack-launch-timeline-revision.md` — partially
  superseded on timing; quality framing preserved
- `docs/decisions/0011-acl-block-priority-over-marathon-phase-1.md` — sibling
  pattern: validated thesis, changed approach on execution
- `docs/projects/ridingpulse.md` — project file (architect authoring in parallel)
- `docs/goals/long-term/substack-2026.md` — goal file updated in parallel to
  reflect accelerated timeline
- `docs/goals/long-term/ridingpulse-v1.md` — goal file for the Aug 1 launch
  (architect authoring in parallel)
