# 0006: Compass — kanban dashboard for personal-OS

## Status

Accepted — 2026-05-03

Updates ADR-0005's daily-entry format and interaction workflow.

## Context

ADR-0005 set up the daily/weekly/habit/goals tracking system as substrate. The substrate is markdown in `docs/daily/`, `docs/weekly/`, `docs/reading-log/`, and `docs/goals/`. The intended workflow had me writing daily entries in markdown each morning and evening.

After designing the substrate, I realized the manual-markdown-writing flow doesn't match how I actually want to use this. Specifically:

- I want to **see** today's tasks and this week's goals in a UI, not scroll a markdown file.
- I want to **tick** boxes in that UI, not edit checkboxes in markdown.
- I want **tasks to flow** from a weekly pool into daily commitments, kanban-style.
- I want it on **my phone**, not just a laptop.
- I want **evening retrospective to remain optional** — when I have something to say, not as a daily prescription.

The right pattern is the same one we used for the WardForge brain: substrate stays canonical (markdown in GitHub), and a frontend surface sits on top to handle daily interaction. Compass is that surface.

## Decision

Build Compass — a kanban-style dashboard for the personal-OS, hosted on Cloudflare Pages, with a Cloudflare Worker backend that reads and writes the personal-OS substrate via the GitHub API.

### Architecture

```
[Phone/Laptop browser]
         ↓
[Compass frontend on Pages]
         ↓
[Compass worker on Workers]
         ↓
[GitHub: troyc9977/personal-os] (canonical substrate)
```

Same architectural pattern as `wardforge-brain`. Different repo, different worker, different frontend, but identical separation of concerns.

### Repository

- New private repo: `troyc9977/compass`.
- Monorepo structure: `worker/` and `frontend/` directories at the root.
- Same fine-grained PAT pattern as the brain — Compass worker has Contents R/W access to `troyc9977/personal-os` only.

### Hosting

- Frontend: Cloudflare Pages, free `*.pages.dev` subdomain to start. Custom domain later if desired.
- Backend: Cloudflare Worker, free `*.workers.dev` subdomain.
- Auth: Google SSO restricted to my personal Gmail account, same OAuth pattern as the brain.
- KV: Cloudflare KV for session storage and task ID allocation.

### Substrate format changes

The daily and weekly files use task IDs (`[tN]`) to support stable task identity across files when tasks flow from weekly pool to daily.

- Task IDs are unique within a week, reset each week.
- Compass manages ID assignment.
- Big tasks (the week's three) marked with `(big)` flag.
- Incomplete tasks at end of week roll over into next week's pool automatically (Sunday review).

### Dashboard UI

Mobile-first. Stacked vertically on phone, three-column on desktop. Components:

- **Today view**: list of tasks pulled from the week's pool, plus habits checkboxes, plus optional retrospective.
- **Week view**: full task pool with check-off and pull-to-today buttons. Shows this week's three.
- **Goals summary**: read-only display of current quarter and year goals.
- **Settings**: surface for editing static config; goal files are still edited in the repo directly for now.

### Endpoints

```
GET  /api/today              fetch today's daily entry
POST /api/today/task         add a today-only task (creates entry if missing)
POST /api/today/check        toggle a task's check state, sync to weekly file
POST /api/today/retro        append/update retrospective
POST /api/today/habit        toggle a habit

GET  /api/week               fetch this week's pool
POST /api/week/task          add task to weekly pool (assigns ID)
POST /api/week/pull          pull task from weekly pool into today
POST /api/week/three         set or update this week's three

GET  /api/quarter            read-only quarter goals summary
GET  /api/year               read-only year goals summary
```

All endpoints authenticated. Writes commit to GitHub via the Worker's PAT.

### Build sequence

1. **Substrate update** (this commit): daily and weekly file formats updated to support task IDs.
2. **Worker backend**: build endpoints, integrate GitHub API, deploy to workers.dev.
3. **Frontend**: React + Tailwind, mobile-first, deploy to pages.dev.
4. **Use it for a week**, then iterate based on actual friction points.

### Deferred features

Not built in v1, but the architecture supports them for v2:

- Habit history view (last 30 days, dot grid).
- Weekly review interface (Sunday flow as a guided UI).
- Reading log entry surface.
- Tweet count tracker (toward Substack precondition).
- Quick-capture to inbox.md from anywhere.
- Push notifications for daily reminders.
- Offline support / PWA.

## Consequences

### Positive
- Daily interaction friction drops from "open markdown editor and write" to "tap checkbox on phone."
- Substrate stays canonical and human-readable. Brain (when deployed) can read the same files Compass reads/writes.
- Mobile use becomes possible, which unlocks logging-in-the-moment habits (tick after run, tick after meditation, add small tasks during the day).
- Kanban + flow pattern matches how I actually think about tasks (some are committed for today, some are in a weekly pool waiting to be pulled).
- Retrospective stays optional, so the daily entry isn't a forced journaling exercise.
- Same hosting pattern as brain means the deploy/auth/PAT infrastructure I just built gets reused.

### Negative
- More code to maintain. Compass is a real app, not a markdown convention.
- Substrate format becomes slightly less readable to a casual eye because of task IDs. Mitigated by the IDs being short and contained.
- Risk that Compass becomes the bottleneck — if the dashboard breaks, the daily flow stops. Mitigated by the markdown files remaining editable directly.
- Build time. Realistically 6-8 hours of focused work to get Compass v1 shipping.

### Neutral
- The brain deploys on top of the same substrate after Compass has been generating real data for a few weeks. Order matters: dashboard first, then brain.

## Alternatives considered

- **Stick with manual markdown editing.** Rejected. The whole reason I'm doing this is to make tracking low-friction enough to actually happen. Manual markdown editing is exactly the friction I want to remove.
- **Use an off-the-shelf tool (Todoist, TickTick, Notion).** Rejected. Substrate would no longer be canonical; data would be locked in someone else's database. The whole personal-OS premise is markdown-in-git as the source of truth.
- **Build Compass without the kanban flow — just a daily checklist.** Rejected. The flow from weekly to daily is exactly what makes the OKR-style weekly planning connect to daily action. Without it, the layers don't talk to each other.
- **Build the brain first, dashboard later.** Rejected. The brain reads substrate that doesn't yet exist (I haven't been filling daily files manually). Dashboard creates substrate by being the daily interaction surface. Brain becomes useful once substrate is real.
- **Custom domain from day one.** Rejected. Not needed for a single-user tool. Free `*.pages.dev` subdomain ships in days; custom domain is a 10-minute migration later.

## Review

This ADR gets revisited at:
- **End of May 2026**: is Compass deployed and being used daily? What's broken?
- **End of Q2 (June 30)**: substantive review. Is the kanban flow right? Are tasks rolling over correctly? Has the retrospective stayed optional or become annoying?
- **End of 2026**: full review including whether to add the deferred v2 features.

## Related

- `docs/decisions/0001-personal-os-exists.md` — the meta-decision
- `docs/decisions/0005-tracking-system.md` — the substrate this dashboard reads
- `docs/projects/habits.md` — habit tracking conventions
