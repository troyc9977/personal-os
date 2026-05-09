# Conventions

The rules every agent (and Troy) should follow in this repo. Short on purpose —
add to this when a real disagreement surfaces, not preemptively.

## File and directory naming

- Markdown files: `kebab-case.md`. Exceptions: `README.md`, `CLAUDE.md`,
  `CONVENTIONS.md`, `ARCHITECTURE.md` (uppercase by convention).
- YAML goal files: `kebab-case.yaml`, filename matches the `id` field exactly.
- ADRs: `ADR-NNNN-kebab-case-title.md` where NNNN is zero-padded (e.g. `ADR-0011-...`).
- Task specs: `docs/tasks/kebab-case.md`.
- Review reports: `docs/reviews/<branch-name>.md` (slashes in branch names become hyphens).

## Markdown style

- Headings start at `#` (one H1 per file, the title).
- Lines wrap at ~88 chars in prose. Don't hard-wrap in lists or code blocks.
- Use `-` for unordered lists, not `*`.
- Code blocks are fenced with triple backticks and a language tag.
- Internal links: relative paths from the file's location, not absolute URLs.

## YAML style

- Two-space indent. No tabs.
- Lowercase keys, snake_case for multi-word.
- Dates are ISO 8601 (`2026-10-18`), never localized.
- Strings: unquoted unless they contain special characters or could parse as
  another type (e.g. `"true"`, `"2026-01-01"`).

## Git

- Branches: `<agent>/<short-description>` (e.g. `builder/compass-tag-filter`).
  For human-driven work, `troy/<short-description>`.
- Commits: imperative present (`add filter`, not `added`/`adds`).
  Subject ≤72 chars. Body explains *why*, not *what*. Wrap body at 72.
- One feature per PR. Squash-merge by default; preserve history only when
  the individual commits tell a useful story.
- Never force-push. Never `reset --hard` on a shared branch.

## Commit message scope tags

Optional but encouraged for clarity:

- `feat:` — new capability
- `fix:` — bug fix
- `docs:` — documentation only
- `refactor:` — no behavior change
- `chore:` — tooling, deps, config
- `adr:` — new or updated ADR

Example: `feat(compass): add tag-based filter to kanban view`.

## Documentation

- Document what's true now, not what's planned. Plans go in `panoramas/`.
- ADRs capture decisions. CLAUDE.md captures repo orientation. README.md captures
  what this is and how to use it. Don't duplicate across these.
- If a doc is wrong, fix it in the same PR as the code change that made it wrong.
  The Doc Writer agent exists to enforce this; help it by flagging what needs
  updating in your PR description.

## When this file disagrees with the code

The code wins, and that's a bug. Either update the code to match or update this
file with an ADR explaining why the convention changed.
