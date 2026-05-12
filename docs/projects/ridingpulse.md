# RidingPulse

**Status**: active, primary work-life vehicle through 2029. Major thesis pivot 2026-05-12 (see ADR-0014). Refined 2026-05-12 with V1 scope and public-launch date.

This file is the *personal-context* view of RidingPulse. Operational work lives in the company repo. What belongs here is what the company is to me, where it stands at a high level, and what it's costing me in time and attention.

Last updated: 2026-05-12

## What it is

Co-founded with Matthew. Toronto-based. The long-arc vision is Palantir for Canada — a provincial and federal political analytics platform that gives Canadian political analysts asymmetric information access. Canadian data on Canadian compute.

The near-term shape is narrower and more honest: a personal analytics tool that I use to generate in-depth Canadian political analysis under my own byline. The audience compounds first. The product monetizes after the audience exists and the analysis has demonstrated what the platform can do.

## Where it sits in my long-arc

Technology cylinder of the 25-year project (per `identity.md`). The vehicle through which I do "build a Canadian software company that stays Canadian." A 5-10 year build, not a 3-year flip.

Priority 1 per ADR-0002. Unchanged by the pivot — the company is still the primary work-life vehicle. What changed is the go-to-market motion, not the position.

## The thesis change

The previous shape (under the WardForge name) was customer-first GTM: cold emails to municipal candidates, a Toronto/Hamilton MVP gated to the October 26, 2026 municipal cycle, a BC Conservatives 2028 partnership target downstream.

The honest read after months of substrate: cold customer outreach is slow-feedback and friction-heavy. Each email is the same lift as the last — there is no flywheel. The mechanism does not compound. And the binding risk — "possibly under-investing in user outreach" — was already named in the prior project file as the thing I was avoiding. Naming it did not fix it; the mechanism was wrong.

The new shape is audience-led. I build the product primarily to support my own political analysis writing, publish the analysis under my own byline, and let customers surface through the published work. This compounds two of the things I am actually good at (writing and technical building) instead of asking me to be good at a third thing (cold sales) that I was not investing in. It is also the pattern from ADR-0011: validated long-arc thesis, changed approach — the underlying commitment to Canadian political technology holds; the route to it changes because the previous route was not working.

## Current shape (May 12 → Aug 1, 2026)

**Personal-build phase.** The tool is built primarily to support my own political analysis writing under my own byline. There is no campaign customer in this phase, no sales motion, no enterprise tier.

**Public-viewer launch 2026-08-01 at `ridingpulse.ca`.** This is the binding near-term deadline. The site goes live on August 1 with the V1 scope below — a public read-only viewer that anyone can land on, browse, and use. No campaign features, no auth-gated tools beyond a basic public-viewer account.

## V1 scope (Aug 1 launch)

Holding the line on scope. Anything not in this list is V1.5 or later.

- **Data**: lobbying registries only. No campaign-contribution data in V1 (deferred to V1.5).
- **Jurisdictions**: Toronto + Federal only. Ontario provincial deferred to V1.5.
- **UI**: full map-first per original plan.
  - **Tech stack**: MapLibre GL JS + Martin (PostGIS vector tiles) + deck.gl overlays.
  - **Four zoom tiers**: Country / Province / Riding / Neighbourhood.
  - **Permanent dark theme.**
  - **Typography**: Chakra Petch (display) + Inter (body).
- **Auth**: Supabase Auth, public-viewer tier only. No campaign tier in V1.
- **311 live request feed**: stretch goal. Keep as stretch; drop if anything else falls behind.

## Killed / superseded by this pivot

Naming these explicitly so future-Troy reading in 6 months sees the shift cleanly:

- **The WardForge name.** Replaced by RidingPulse.
- **October 26, 2026 customer launch target.** Replaced by 2026-08-01 public-viewer launch. No more candidate-cycle deadline.
- **Toronto/Hamilton municipal MVP framing.** Superseded. The MVP is a public-viewer data tool serving my own analytical writing, not a candidate-facing campaign product.
- **$4K-$9K campaign licences.** Killed for V1. No campaign tier in V1; monetization shape deferred entirely.
- **20-prospect outreach pipeline.** Killed. Audience-led GTM does not have a cold-prospect pipeline.
- **Customer outreach as the primary motion.** Superseded. The primary motion is "build the tool, publish the analysis."
- **BC Conservatives 2028 partnership target.** Deferred indefinitely. Re-evaluate when the product has matured and the audience exists.
- **"First 5 customer contacts" three-slot / embedded customer-outreach goal.** Killed. There is no replacement.

The previous `wardforge.md` file is deleted as part of this pivot. Git history preserves it.

## Matthew

50/50 equity split intact. **Current phase**: async sounding board — Matthew reads what ships, gives feedback when he has time. Not full-time in this phase.

**Full-time trigger**: scale-up beyond the personal-build phase, when the audience and the tool together justify a second operator.

**Strategy call 2026-05-13** to align on the pivot. Founders' agreement update pending after that conversation — at minimum, company name and GTM language need updating before signing.

## Writing program (paired with the tool)

Under **Troy Campbell's own byline** on Substack. Publication name TBD; default to Troy Campbell.

- **First piece 2026-06-30.** Built on the tool's first usable analytical output.
- **Biweekly cadence after.** Locked once the real time-cost of publication-grade analysis is known from piece 1.
- **Twitter cross-posts + real-time commentary.** The audience-building motion is publication + ongoing Twitter, not Twitter as a separate growth project.
- **Decline-of-West essay parked as future piece, not first.** Not the right opener for this arc — the first piece anchors on the tool's output (lobbying networks) so that what the product does is visible from the start. The Decline-of-West thesis and existing 5-section outline are preserved and held in rotation.

Full writing arc tracked in `docs/goals/long-term/substack-2026.md`.

## Current state

- Pivot decision 2026-05-12. ADR-0014 captures the rationale.
- Refinement pass 2026-05-12 added the V1 scope, Aug 1 launch date, and Matthew's async-sounding-board phase.
- Tool: pre-MVP. Infrastructure scaffold first (Supabase + Trigger.dev + Fly.io YYZ deploy). Data pipeline before UI.
- Public viewer at `ridingpulse.ca` on 2026-08-01.
- First Substack piece on 2026-06-30 from working tool, before the map UI.
- Brain (`brain.ward-forge.com`) deployed under the old name; rename downstream.

## Near-term milestones

- **2026-05-13** — Strategy call with Matthew. Align on pivot.
- **2026-06-30** — First Substack piece published, with tool-generated network analysis.
- **2026-08-01** — `ridingpulse.ca` public-viewer launch (V1 scope above).

Granular milestones live in `docs/goals/long-term/ridingpulse-v1.md`.

## What it's costing me

- **Time**: ~Thursday + Saturday + evenings, ~25-35 hours/week on top of DCC. The pivot does not reduce the time spent; it redirects what gets built.
- **Attention**: high. Dominant background process.
- **Capacity for other work**: real but reshaped. Substack target moves earlier (from November to June 30) because the publication is now coupled to the tool, not a separate downstream project. Filmmaking remains paused per `identity.md`; the May screenplay sprint is a deliberate small exception (see `docs/goals/long-term/screenplay-may-21.md`).
- **Capacity for relationships**: needs watching. Family and friends sit at priority 2 specifically to counter this.

## What I am worried about

- **Audience-led GTM not generating customer signal fast enough.** Publication compounds slowly. Six months in, if no inbound has materialized and the tool is mature, the thesis needs revisiting — not abandoning, but interrogating.
- **Substrate-as-avoidance, version 2.** The previous version was "building feels more productive than customer outreach." The new version is "writing analysis feels more productive than the harder commercial-validation work that even an audience-led motion eventually requires." Watch for it.
- **Tool scope creep past V1.** A personal analytics tool can become an infinite engineering project. V1 is locked: lobbying only, Toronto + Federal only, map UI, public viewer. Anything beyond that is V1.5.
- **Map UI eating data-pipeline time.** The June 30 piece needs the data pipeline working, not the map. If the map work starts before the network analysis is solid, the piece slips. Discipline: data before UI.
- **311 stretch goal becoming a binding ask.** It is stretch. If anything is slipping by mid-July, 311 drops first.
- **Matthew alignment under the new shape.** The role he signed up for (co-founder on a customer-first municipal product) is materially different from co-founder on an audience-led analytics platform with an async-helper near-term role. The 2026-05-13 call is the conversation, not a check-in.

## Open questions

- **Long-term monetization shape.** B2C analyst tool sold to political-curious individuals? B2B sold back to campaigns and parties once the brand and audience exist? Media business with paid subscription as the core revenue? All three layered? Probably layered, but the order matters and the order is not yet decided. Decision deferred until V1 is live and audience data exists.
- **V1.5 shape.** Contributions data, Ontario provincial, possibly a campaign tier — these are V1.5 candidates. Whether they get their own goal file or roll into a V1.5 goal file depends on what's learned by August.
- **Incorporation / LLC structure.** The current legal structure was sized for a customer-first launch in October 2026. The new timeline is different; the structure may need to be different too. Cost of keeping it is small; cost of restructuring later is real. Decide deliberately, not by default.
- **Data sovereignty story.** Canadian data on Canadian compute remains a durable differentiator regardless of GTM motion. It is still the right pitch; the question is when the pitch starts mattering commercially.

## Dual-loyalty notes

RidingPulse content and DCC content do not mix. The personal-OS repo holds only my personal-context view; operational substrate is in the company repo.

## References

- `docs/decisions/0014-ridingpulse-pivot.md` — the pivot ADR
- `docs/decisions/0002-priority-ordering.md` — RidingPulse at priority 1
- `docs/goals/long-term/ridingpulse-v1.md` — V1 build arc with granular milestones
- `docs/goals/long-term/substack-2026.md` — writing arc coupled to this work
- `docs/identity.md` — the long-arc commitments this serves
