# 0001: Personal OS exists, kept in private GitHub repo

## Status

Accepted — 2026-05-03

## Context

I have been running my life across many surfaces — Notion pages, scattered notes, conversations with Claude, partial systems that drift after a few weeks. The substrate work I just finished for WardForge made obvious that the same pattern applied personally would compound substantially. A single canonical source for what I'm working on, what I've decided, what I'm tracking, and how I'm living.

The question was whether to actually commit, given the failure history of personal productivity systems.

## Decision

I am committing to a personal substrate, kept in a private GitHub repo (`troyc9977/personal-os`), structured the same way as the WardForge company repo: identity at the top, current routines, project files, decisions as ADRs, weekly states, an inbox, free-form notes. Markdown only.

The discipline is: every meaningful decision becomes a one-paragraph ADR within 24 hours. Inbox processed weekly. Project files updated weekly for active projects.

Eventually a brain (parallel to the WardForge brain) will sit on top of this repo. For now, just the substrate.

## Consequences

### Positive
- Continuity across sessions and conversations.
- Decisions become durable artifacts instead of ephemeral conclusions.
- A real substrate enables a useful brain later.

### Negative
- Maintenance burden, real but small if I keep the discipline at minimum-viable level.
- Risk of becoming the kind of person who maintains a system rather than lives a life. Mitigated by keeping the daily ask near zero (capture-only) and pushing process to weekly cadence.

### Neutral
- The repo is private. It is not a public artifact and never will be.

## Alternatives considered

- **Notion personal workspace.** Tried before. Drifts. Block-based editor encourages clutter. Markdown in git is more durable.
- **Obsidian.** Better than Notion. But pulled toward a separate-tool world. Markdown in git serves the same purpose with more portability.
- **No system, just live.** Honest option. Rejected because the substrate I already accumulate (in conversations, half-notes, scraps) is undermined by having no canonical home.
