---
id: ridingpulse-v1
title: RidingPulse v1 — public-viewer tool launch
type: career
status: active
priority: 2
created_at: 2026-05-12
target_date: 2026-08-01
tags: [ridingpulse, build, lobbying, civic-tech]
references:
  - docs/projects/ridingpulse.md
  - docs/decisions/0014-ridingpulse-pivot.md
  - docs/decisions/0002-priority-ordering.md
milestones:
  - { title: "Architecture sketch + infrastructure scaffold (Supabase, Trigger.dev, Fly.io YYZ deploy)", target: 2026-05-17, done: false }
  - { title: "Toronto Lobbyist Registry scraper running, daily refresh",                                  target: 2026-05-24, done: false }
  - { title: "Federal Lobbying Registry (OCL) scraper running",                                           target: 2026-05-31, done: false }
  - { title: "Entity resolution (Splink) configured across both jurisdictions",                           target: 2026-06-07, done: false }
  - { title: "Network analysis queries working — lobbyist → target graph",                                target: 2026-06-14, done: false }
  - { title: "Network graph visualization for first Substack piece",                                      target: 2026-06-21, done: false }
  - { title: "First piece tool integration complete (data + visuals embeddable)",                         target: 2026-06-28, done: false }
  - { title: "Map UI scaffold — MapLibre + Martin, first zoom level functional",                          target: 2026-07-07, done: false }
  - { title: "All four zoom tiers functional (Country/Province/Riding/Neighbourhood)",                    target: 2026-07-14, done: false }
  - { title: "deck.gl overlays for lobbying data on map",                                                  target: 2026-07-21, done: false }
  - { title: "Public viewer feature-complete (search, browse, drill-down)",                               target: 2026-07-28, done: false }
  - { title: "ridingpulse.ca public launch",                                                               target: 2026-08-01, done: false }
sessions_log: []
---

# RidingPulse v1 — public-viewer tool launch

## What it is

The V1 build arc for RidingPulse: the lobbying-only, Toronto-plus-Federal,
map-first public viewer that launches at `ridingpulse.ca` on 2026-08-01.
This is the build side of the pivot recorded in ADR-0014. The writing
arc that pairs with it lives in `substack-2026.md`.

Scope is locked in `docs/projects/ridingpulse.md`: lobbying data only
(no contributions in V1), Toronto + Federal only (no Ontario provincial
in V1), full map-first UI (MapLibre + Martin + deck.gl, four zoom tiers,
dark theme, Chakra Petch + Inter), public-viewer auth tier only via
Supabase. 311 live feed is a stretch goal, droppable.

## Approach

Two-phase build inside one arc:

- **May 12 → June 30**: build-in-the-open for the first Substack piece.
  Infrastructure first, then scrapers (Toronto Lobbyist Registry → Federal
  OCL), then entity resolution, then network analysis. The output of this
  phase is data and visualizations embedded in the first Substack piece
  on 2026-06-30 — not a polished UI. The piece ships on working analysis,
  not on the map.

- **July 1 → August 1**: map UI to public-launch quality. MapLibre + Martin
  scaffold, all four zoom tiers, deck.gl overlays for the lobbying data,
  public-viewer features (search, browse, drill-down), launch on `ridingpulse.ca`.

The order is deliberate. Data and analysis fuel the writing on June 30.
The map is the public artifact on August 1. Inverting the order means
the June piece slips waiting for a UI that isn't load-bearing for the
piece itself.

## Watch-for signals

- **Scope creep beyond lobbying-only.** Contributions data, Ontario provincial,
  campaign-tier features — all V1.5. Pulling any of them forward eats the
  August 1 date.
- **Map UI work starting before the June 30 piece ships.** The piece needs
  the data pipeline solid. If map-scaffold work begins in mid-June "to get
  ahead," the piece slips and the rationale for the pivot weakens.
- **311 stretch goal becoming a binding ask.** It is stretch. If anything
  else slips by mid-July, 311 drops first, not the map tiers.
- **Engineering-pull on the infrastructure layer.** Supabase, Trigger.dev,
  Fly.io are sized for V1. If V1 setup turns into a multi-week platform
  engineering project, that is substrate-as-avoidance with a stack trace.

## Open

- **Monetization shape for V1.5.** Public viewer is free in V1. V1.5 may
  introduce a paid tier (campaign features, deeper analytics, alerts).
  The shape gets decided once V1 has been live long enough to read what
  the audience actually uses.
- **Whether V1.5 contributions data wants its own goal file** or rolls
  into a single V1.5 goal file alongside Ontario provincial and any
  paid-tier work. Decide near August 1, when V1 is in flight and the
  shape of "what comes next" is visible.
- **`ridingpulse.ca` domain procurement and DNS.** Treat as part of the
  August 1 launch milestone; track explicitly in the company repo if it
  doesn't land alongside the public-viewer feature-complete milestone.

## Related

- `docs/projects/ridingpulse.md` — project-level context, scope decisions, GTM
- `docs/decisions/0014-ridingpulse-pivot.md` — the pivot ADR
- `docs/decisions/0002-priority-ordering.md` — priority order
- `docs/goals/long-term/substack-2026.md` — writing arc paired with this build
