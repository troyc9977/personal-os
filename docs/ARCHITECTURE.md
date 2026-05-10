# Architecture

How personal-os fits together. Read this before starting any non-trivial change.

## What this repo is

personal-os is Troy's source-of-truth substrate: markdown and YAML-fronted
markdown files for daily logs, goals, projects, decisions, and long-lived
reference docs. It is **not** an application. It has no build, no tests in the
traditional sense, no deploy. The files in this repo ARE the deliverable.

The repo is small and intentional. Almost everything lives under `docs/`.

## Components

### Reference docs (`docs/identity.md`, `docs/people.md`, `docs/reading.md`, `docs/routines.md`)

Long-lived reference Troy maintains by hand. Read freely; edit only with
explicit instruction.

`docs/identity.md` is the most important file in the repo. The 25-year project,
values, long-arc commitments, and what Troy is *not* optimizing for. Anything
that contradicts identity.md is either drift or a decision-pending.

`docs/routines.md` describes the current week shape (work days, gym days, run
days, meditation, sleep target). Goal-file schedules should align with this
unless they're explicit overrides.

`docs/people.md` and `docs/reading.md` are private and personal. The librarian
checks staleness; the scribe updates only with explicit instruction.

### PRIVATE strategy docs

`docs/comprehensive-long-term-plan.md` and `docs/personal-long-term-plan-PRIVATE.md`
hold partisan and strategic content marked "NOT FOR WARDFORGE REPO." They cover
phased political infrastructure ambitions, conservative-aligned ecosystem
mapping, and identity decisions about public vs private partisan positioning.

Agents may read these for context. The architect specifically benefits — these
contain Troy's actual strategic landscape and inform better ADR drafts.

Agents may NOT export content from these files into other files. The
`.claude/hooks/leak-check.js` hook scans every Write/Edit for leak signatures
and either blocks (PRIVATE files themselves) or warns (potential leakage).

### Inbox (`docs/inbox.md`)

Running capture log. Newest at top — new captures prepend to their date
section, new date sections prepend right after the front-matter `---`
separator. Single-line bullets only. Compass-managed.

### Daily entries (`docs/daily/YYYY-MM.md`)

One markdown file per month, with multiple `## YYYY-MM-DD (Day)` sections
inside. Each day has `### Today`, `### Habits`, and optional `### Retrospective`
subsections. Tasks are checkbox bullets with per-week scoped IDs:

```
- [ ] [t3] Task title (big)
```

The format is parsed by Compass — load-bearing, not stylistic.

### Weekly entries (`docs/weekly/YYYY-MM.md`)

One markdown file per month with `## Week of YYYY-MM-DD (range)` sections.
Each week has `### This week's three`, `### Tasks pool`, `### Sunday review`,
and `### Next week's three` subsections. Same checkbox format as daily.
Compass-managed.

### Reading log (`docs/reading-log/YYYY-MM.md`)

One markdown file per month. Date-headered entries with book and page numbers.
Substantial notes get promoted to `docs/notes/YYYY-MM-DD-bookname.md`.

The reading log accumulates over years into the most honest measure of the
reading practice. Twelve files per year. Sixty by 2030.

### Calendar (`docs/calendar/YYYY-MM.md`) — *planned*

Events and appointments primitive. Compass v2 will parse and render. Schema
under design — frontmatter-driven, list of events with `id`, `date`, `time`,
`title`, `type`, `must_attend`, `duration_min`, `notes`. Not yet present in
the repo; wait for Compass v2 to land before authoring files here.

### Goals — annual and quarterly (`docs/goals/YYYY.md`, `docs/goals/YYYY-Qn.md`)

Markdown goal docs maintained by hand. Three big bets per year, three top
items per quarter, plus what Troy is *not* doing this year/quarter. Free-form
structure within those headings.

### Goals — long-term (`docs/goals/long-term/<slug>.md`)

YAML-frontmatter goal files with milestones, schedules, and sessions_log.
Schema in `docs/schemas/goal-frontmatter.md`. Current files:

- `docs/goals/long-term/acl-return-to-sport.md` — backed by ADR-0011
- `docs/goals/long-term/screenplay-may-21.md`
- `docs/goals/long-term/substack-2026.md` — backed by ADR-0009 (launch timing); ADR-0004 preconditions framework still applies
- `docs/goals/long-term/toronto-half-2026.md` — backed by ADR-0011 (Phase 1 amendment)
- `docs/goals/long-term/stop-smoking-2026.md` — no dedicated ADR yet (flagged)
- `docs/goals/long-term/reading-2026.md` — backed by ADR-0013 (session_log input type, soft-floor framing)

Note: `cnc-shop-acquisition.md` was moved to `docs/notes/2026-05-09-cnc-shop-acquisition.md`
(goal deferred; ADR-0007 still references the old goal path — flagged for architect).

The architect authors against the schema; the scribe updates existing files.

### Architecture Decision Records (`docs/decisions/`)

One markdown file per decision, numbered sequentially (`0001-personal-os-exists.md`
onward). Captures *why* a choice was made, not just *what* the choice was.
Currently 0001–0013. Next available: 0014. Index: `docs/decisions/README.md`. Template: `docs/decisions/template.md`.

The architect drafts ADRs. The librarian maintains the index after merges.

### Projects (`docs/projects/`)

One markdown file per active life-project: `28th-floor.md`,
`contemplative-practice.md`, `dcc.md`, `family-friends.md`, `filmmaking.md`,
`habits.md`, `heritage-restoration.md`, `substack.md`, `wardforge.md`. Each
file is the source-of-truth for that project.

Project files follow a shape: status, what-it-is, where-in-long-arc,
honest-current-state, watch-for-signals, decision-triggers. The scribe matches
this shape when updating; doesn't impose new structure without architect spec.

### Notes (`docs/notes/`)

Freeform dated thinking. Light structure. The scribe promotes mature inbox
bullets here as `YYYY-MM-DD-short-name.md`.

### Schemas (`docs/schemas/`)

Currently `goal-frontmatter.md` documenting the YAML schema for long-term
goal files. The architect uses this when drafting; the librarian validates
existing files against it.

### Working dirs (`docs/tasks/`, `docs/reviews/`)

Output of the sub-agent team:
- `docs/tasks/` — task specs from architect to scribe (rare for this repo).
- `docs/reviews/` — audit reports from the librarian.

Created as needed.

## External consumers

### Compass (separate repo, `troyc9977/compass`)

A kanban dashboard that reads and writes the substrate via the GitHub
Contents API. Stack:

- **Frontend:** React + Vite + Tailwind, deployed to Cloudflare Pages
  (`compass-een.pages.dev`).
- **Worker API:** Hono on Cloudflare Workers (`compass-api.troyc.workers.dev`),
  using Google OAuth for auth and Cloudflare KV for sessions.

Compass mutates `docs/daily/*.md`, `docs/weekly/*.md`, and `docs/inbox.md`
through the GitHub PUT-with-sha flow. It expects exact format compliance.
The Compass worker's `daily.ts`, `weekly.ts`, and `inbox.ts` are the
authoritative parser specs.

Compass v2 is the next planned arc: calendar primitive, Upcoming card,
Goals-view (read-only), risk surfacing on milestones, tap-increment widget
for the smoking goal. Compass v3+: AI ingestion for events, AI subtask
proposal for goals.

## Data flow

```
Troy / Compass UI ──► docs/daily/*.md, docs/weekly/*.md, docs/inbox.md
Troy (only)       ──► everything else (identity, projects, decisions, goals, notes, ...)

PRIVATE strategy docs ──► (read by humans + agents; agents must not export content)
docs/decisions/       ──► (read by humans + agents, not parsed by Compass)
docs/goals/long-term/ ──► (read by Compass v2 to materialize scheduled tasks; written by humans + agents)
```

The substrate is the source of truth. Compass is a view + mutation layer
over the three files it manages.

## Where things should NOT live

- Real secrets or credentials — never in this repo. Compass keeps OAuth client secrets and the GitHub token in Cloudflare Worker secrets.
- DCC work artifacts — separate concern, separate workflow.
- WardForge code — separate repo. (Personal-context project tracking files DO live here, in `docs/projects/wardforge.md`.)
- Drafts of public Substack posts after they're published — published pieces live on Substack itself.

## Open architectural questions

> Use this section to surface things that aren't decided yet. The architect
> agent adds to this list when it finds ambiguity worth flagging.

- Should `docs/people.md` and `docs/identity.md` be part of the leak-check scan? Currently no — they're internal-tier. Could change if anything from them ends up in public-leaning files.
- Calendar primitive schema — pending Compass v2 design.
