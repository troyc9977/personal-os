# personal-os

Troy's personal operating system substrate. Markdown source of truth for daily
logs, weekly plans, goals, projects, decisions, and long-lived reference docs.

This is a **substrate, not an application**. There's no build, no test runner,
no deploy. The files in this repo ARE the deliverable.

This file is read by every agent on every session. Keep it short, accurate,
oriented toward "what does an agent need to know to not screw up?"

---

## What lives here

Top level:
- `README.md` — short repo intro for humans.
- `CLAUDE.md` — this file. Orientation for agents.

`docs/` — almost everything:
- `ARCHITECTURE.md` — how the substrate fits together. Read this on first session.
- `CONVENTIONS.md` — naming, formatting, commit style.
- `identity.md`, `people.md`, `reading.md`, `routines.md` — long-lived reference docs Troy maintains by hand.
- `inbox.md` — running capture log, newest at top. Compass-managed.
- `daily/YYYY-MM.md` — daily entries. Compass-managed (load-bearing format).
- `weekly/YYYY-MM.md` — weekly entries. Compass-managed (load-bearing format).
- `reading-log/YYYY-MM.md` — daily reading log.
- `calendar/YYYY-MM.md` — events/appointments. *Planned (Compass v2). Not yet present.*
- `goals/YYYY.md`, `goals/YYYY-Qn.md` — annual and quarterly markdown goal docs.
- `goals/long-term/<slug>.md` — YAML-frontmatter goal files with milestones, schedules, sessions_log. Schema in `docs/schemas/goal-frontmatter.md`. *Some files referenced by ADRs but not yet authored — flagged in librarian audits.*
- `decisions/NNNN-*.md` — Architecture Decision Records, numbered 0001+. Index in `decisions/README.md`. Template in `decisions/template.md`. Currently 0001–0012. Next available: 0013.
- `projects/*.md` — one file per active life-project (`28th-floor.md`, `dcc.md`, `substack.md`, `wardforge.md`, etc.).
- `notes/YYYY-MM-DD-name.md` — freeform dated thinking, promoted from inbox when ideas mature.
- `schemas/*.md` — schemas for structured files (currently `goal-frontmatter.md`).
- `tasks/` — task specs written by the architect for the scribe. Created as needed.
- `reviews/` — audit and validation reports from the librarian. Created as needed.

`.claude/agents/` — sub-agent definitions.
`.claude/hooks/` — pre-tool-use safety checks (see "PRIVATE files" below).
`.claude/settings.json` — hook registration.

## The two PRIVATE files

`docs/comprehensive-long-term-plan.md` and `docs/personal-long-term-plan-PRIVATE.md`
contain partisan and strategic content marked "NOT FOR WARDFORGE REPO."

**Agents can read these for context.** That's a feature — they hold Troy's
actual strategic landscape, which informs better ADR drafts and goal-file specs
than the redacted public version.

**Agents must NOT export content from these files into other files.** No
paraphrasing strategic phases into project files. No quoting partisan rationale
into Substack drafts. No mentioning the filenames in any non-PRIVATE file.

A `PreToolUse` hook (`.claude/hooks/leak-check.js`) enforces this:
- Direct Write/Edit on the PRIVATE files is **blocked**. Troy edits these manually.
- Write/Edit on any other file is **scanned for leak signatures**. Public-leaning files (`docs/projects/wardforge.md`, Substack drafts under `docs/notes/`, `docs/goals/long-term/substack-*.md`, README, CLAUDE.md, ARCHITECTURE.md) get a strict warning. Internal files get a soft warning.

If the hook fires, surface the warning to Troy and confirm before proceeding.
Don't try to bypass it.

## External consumers

**Compass** (separate repo, `troyc9977/compass`) is a kanban dashboard that
reads and writes the substrate via the GitHub Contents API. It mutates
`docs/daily/*.md`, `docs/weekly/*.md`, and `docs/inbox.md` to keep them in sync
with checkbox toggles and task adds in the UI. Deployed at `compass-een.pages.dev`
with a Worker API at `compass-api.troyc.workers.dev`.

What this means for agents:

- **Format is load-bearing in three locations.** Compass parses
  `docs/daily/*.md`, `docs/weekly/*.md`, and `docs/inbox.md` with regex.
  Don't reformat checkboxes (`- [ ]` / `- [x]`), don't change `## YYYY-MM-DD (Day)`
  date headers, don't reorder `### Today` / `### Habits` / `### Retrospective`
  subsections. Authoritative parser specs live in the Compass repo at
  `worker/src/daily.ts`, `worker/src/weekly.ts`, `worker/src/inbox.ts`.
- **Task IDs are scoped per-week.** `[t1]` in week N is unrelated to `[t1]` in
  week N+1.
- **Newest at top in inbox.** New `## YYYY-MM-DD` headings prepend right after
  the front-matter `---` separator.

Other files (`docs/decisions/`, `docs/projects/`, `docs/goals/`, `docs/identity.md`,
etc.) are not parsed by Compass. They can be reformatted with normal care for
existing conventions.

## How work happens here — the sub-agent team

This repo runs three sub-agents, scoped to high-leverage workflows:

- **architect** — Decomposes fuzzy thinking into structured artifacts. Drafts ADRs from "I just decided X." Authors goal-file YAML frontmatter + narrative against the schema in `docs/schemas/goal-frontmatter.md`. Identifies the right container for any input (ADR vs goal vs project update vs inbox vs note). Reads `identity.md`, ADR-0002, the PRIVATE files for context. Writes only structured artifacts.
- **scribe** — Writes content in house voice against architect specs. Updates project files. Drafts weekly review composition by reading `daily/`, `weekly/`, `reading-log/`. Promotes mature inbox bullets to `notes/`. Doesn't make architectural decisions.
- **librarian** — Read-mostly. Cross-reference integrity (ADR-0007 references `goals/long-term/cnc-shop-acquisition.md` which was moved to `docs/notes/2026-05-09-cnc-shop-acquisition.md` — flagged drift; ADR-0009 references `goals/long-term/substack-2026.md` which is now authored; `stop-smoking-2026.md` is now authored but has no dedicated ADR yet). Monthly decision audit ("which ADRs from past 30 days are still holding?"). Quarterly project audit. Updates `README.md`, `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/decisions/README.md` after merges. Validates Compass parser-format compliance when daily/weekly/inbox are hand-edited.

**Default sequence for non-trivial work:**
`architect → scribe → (Troy reviews) → librarian audits cross-references`

For tiny, obvious changes, skip to scribe (or do it yourself).

## Off-limits without explicit confirmation

- `.claude/agents/` and `.claude/hooks/` — sub-agent definitions and safety hooks. Don't touch during normal work.
- `.env*`, anything under `~/.ssh/` — never read, never write.
- Force-pushes to `main`. Always work on a branch.
- `git reset --hard`, `git clean -fdx`, `rm -rf` on tracked files.
- `docs/identity.md`, `docs/people.md`, `docs/reading.md`, `docs/routines.md` — read freely. Edit only with explicit instruction from Troy. These are personal source-of-truth docs.
- `docs/goals/2026.md`, `docs/goals/2026-Q2.md` — same. Read freely; edit with explicit instruction.
- `docs/comprehensive-long-term-plan.md`, `docs/personal-long-term-plan-PRIVATE.md` — read for context only; never edit directly; never export content. Hook enforces.
- Reformatting `docs/daily/*.md`, `docs/weekly/*.md`, or `docs/inbox.md` — Compass parses these. See "External consumers" above.

## The substrate-as-avoidance principle

The substrate exists to **notice patterns and catch drift**, not to enforce
compliance and not to substitute for the actual work. A previous code review
flagged "substrate-as-avoidance" as a real failure mode — building Compass /
restructuring goals / refining ADR templates instead of doing the customer
outreach the company needs to survive.

Operating implication: when an agent task expands beyond the scope of what
Troy asked, stop. The substrate's job is to make Troy's life cheaper to run,
not more expensive. If a session is producing more substrate than it's
removing, that's the failure mode.

## Branch and commit style

- Branches: `<agent>/<short-description>` — e.g. `architect/adr-0011-routing`, `scribe/update-wardforge-project`, `troy/<short-description>` for human-driven work.
- Commits: imperative present tense ("add", not "added"/"adds"). Subject ≤72 chars. Body explains *why*.
- One change per PR.

## When in doubt

- Prefer reading more files over guessing.
- If a request is ambiguous, ask before acting.
- If a destructive operation seems necessary, ask before acting.
- Small, reversible commits over big sweeping changes.
- Surface open questions explicitly — Troy prefers being asked over being surprised.
