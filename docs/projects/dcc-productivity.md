# DCC Productivity (AI workflow tooling)

**Status**: active. One core workflow shipped and in regular use. Eval harness next.

This file is *deliberately thin and abstracted* — same discipline as `docs/projects/dcc.md` and `docs/projects/dcc-qa-tool.md`. Detailed implementation tracking — workflows, data types, integration architecture, vendor specifics, accuracy numbers — lives outside personal-OS intentionally. What belongs here is the personal-context view: time investment, decision-level state, and the question of whether to surface the work professionally.

Last updated: 2026-05-12

## What it is

AI tooling for accelerating routine DCC workflows. A meta-level personal-productivity initiative sitting adjacent to day-job work — separate from `dcc-qa-tool.md`, which is a specific tool with a specific scope. This file is the umbrella for the broader question: how much of the routine work of the role can be moved to AI assistance, and what does that change about how the role is performed.

## Where it sits in my long-arc

Two parallel rationales:

- **Time savings on repetitive professional work.** The role contains meaningful repetition. Moving that repetition to AI assistance returns hours that can be spent on RidingPulse, writing, family, or rest — i.e. anything higher in the priority order than DCC (which is #7 per ADR-0002).
- **Skill-building in applied AI engineering.** Hands-on practice with shipping AI tooling against real workflows is the kind of skill that has compounding value for RidingPulse and beyond. Building it inside a job-shaped constraint (real workflows, real accuracy requirements) is sharper than building it on a toy problem.

Lifespan: tied to DCC employment. When DCC ends (likely 2027-2028 per `dcc.md`), the tooling ends with it. The skills do not.

## Current state

- One core workflow shipped and in regular daily use.
- Eval harness is the next build target — quantifying accuracy is the gate to the "surface this professionally?" decision below.
- Other workflows queued for the same treatment once the eval pattern is proven on the first one.

## Time allocation

Increased focus over next 1-3 months. Previously ~5 hours/week; scaling to ~10 hours/week through approximately July. This is a deliberate redirection within the DCC envelope — the additional time is coming out of slower-pass contract-admin time that the shipped workflow itself now saves.

The scale-up is bounded. If the eval harness doesn't land or the accuracy is not what's hoped, the time allocation drops back to ~5 hours/week and the broader initiative parks.

## Conflict of interest hygiene

Same rules as `docs/projects/dcc.md` and `docs/projects/dcc-qa-tool.md`. Explicitly:

- Runs on personal hardware. No DCC laptop, no DCC accounts.
- No DCC protected information ingested into anything that leaves controlled boundaries.
- Not currently deployed beyond personal use.
- No RidingPulse cross-talk. This tooling is not a RidingPulse prototype, demo, or case study.

## Watch-for signals

- **Time displacement.** ~10 hours/week is a real budget. If it's coming out of RidingPulse or writing rather than out of contract-admin time that's actually been saved by the shipped workflow, the math is wrong. Diagnose monthly.
- **Scope creep beyond utility.** Engineering pull is real on AI tooling — there's always a more interesting integration. The point of the work is time savings on routine workflows, not interesting AI work for its own sake.
- **Eval harness deferral.** If the next workflow gets built before the eval harness lands, that is the substrate-as-avoidance pattern. Accuracy without measurement is vibes.

## Open

- **Surface professionally vs. keep purely personal.** The core question. Once the eval harness lands and accuracy is quantified, the decision is whether to advocate for sanctioned internal use within DCC, or to keep the work entirely personal. Arguments either direction:
  - *Surface:* the time savings are real for colleagues too; the institutional credit is meaningful while DCC employment lasts; it's the honest thing to do with tooling that materially changes work product.
  - *Keep personal:* surfacing it introduces governance, review, and political surface area; the cost of that overhead may eat the time savings the tooling produced; it changes the personal-vs-employer character of the work in ways that may not be net-positive given the ~1-year remaining horizon on DCC.

  Decision deferred until eval harness output exists. Likely revisit late June / July.

- **What happens to this tooling when DCC employment ends.** Probably retired. Possibly some patterns inform RidingPulse-side workflow tooling. Decided closer to the time.

## Note on detail

Detailed implementation tracking — specifics of the workflow, data shapes, integration architecture, vendor choices, accuracy numbers — deliberately lives outside personal-OS. This file captures time investment and decision-level state only. The substrate is for noticing patterns and catching drift on the meta-level questions (time allocation, surface-or-not, scope discipline), not for documenting build details.

## Milestones

No fixed dates — sequenced, not calendared. The eval harness is the gate before further investment.

- [ ] Eval harness designed (test set + accuracy metrics)
- [ ] Eval harness running
- [ ] Initial accuracy baseline measured
- [ ] First round of improvements deployed against eval results

## Related

- `docs/projects/dcc.md` — the day-job container
- `docs/projects/dcc-qa-tool.md` — sibling project, a specific tool with specific scope
- `docs/decisions/0002-priority-ordering.md` — DCC at #7; this initiative sits inside that bucket
