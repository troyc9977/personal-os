# DCC QA Tool

**Status**: in build. MVP target: 2026-05-17.

This file is *deliberately thin* — same discipline as `docs/projects/dcc.md`. Operational detail lives in the code; what belongs here is the personal-context view: what this tool is, why it exists, what it costs, and the hygiene that governs it.

Last updated: 2026-05-10

## What it is

A personal mobile-first tool for capturing site-visit photos and comments, then producing a QA report in DCC format. Built to speed up Troy's own QA workflow — not a product, not a team tool, not a startup.

## Scope this week (MVP — 2026-05-10 through 2026-05-17)

20-30 hour build target. One usable artifact by Sunday.

**In scope:**
- Photo capture with per-photo comment
- QA filtering / review step
- CSV export in DCC report format
- Claude Vision deficiency extraction — in MVP if time permits; otherwise next iteration

**Deferred:**
- Floor plan auto-pinning
- PostGIS polygons for spatial tagging
- AWR vs O&M tagging at capture time
- Full mobile PWA shell hardening

## Where it sits in my long-arc

Utilitarian, not its own venture. A personal-productivity layer sitting adjacent to DCC employment. It has no relationship to WardForge, Substack, or any long-arc commitment — it exists because site-visit QA is slow without it.

Lifespan: tied to DCC employment. When DCC ends (likely 2027-2028 per `dcc.md`), this tool ends too.

## Conflict of interest hygiene

Same rules as `docs/projects/dcc.md`. Explicitly:

- Runs on personal hardware only. No DCC laptop, no DCC accounts.
- No DCC protected information ingested. The pipeline handles only photos and comments Troy himself takes and writes at site visits.
- Not deployed to DCC. Not used by DCC colleagues.
- No WardForge cross-talk. This tool is not a WardForge prototype, demo, or case study.
- This repo lives on personal hardware only.

## Watch-for

- **Time displacement.** This week is 20-30 hours of build against a calendar that already holds: ACL rehab (4 gym/agility days + Wed/Sun runs), screenplay sprint Draft phase (~1.5 hrs/day, May 11-17), and the WardForge customer outreach commitment — the non-displaceable item per `decisions/0002-priority-ordering.md`. If evenings are filling with QA-tool build instead of customer outreach, that is the substrate-as-avoidance failure mode. Named here because naming it is the only way to catch it.
- **Scope creep toward product.** The floor-plan / PostGIS / PWA deferred items are engineering pull, not job-site need. If the file is being updated to add deferred items rather than ship the CSV export, stop.
- **COI hygiene slip.** Any moment where DCC operational content (contract numbers, facility names, protected data) enters the pipeline — stop immediately.

## Open items

- Confirm Claude Vision call is within token-cost comfort before enabling in MVP.
- Decide format spec for CSV export — match whatever DCC currently expects from contractor QA reports.
