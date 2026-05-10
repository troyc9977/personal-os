# Validation: reading-tracker substrate 2026-05-10

**Status:** PASS (with minor fixes applied inline)

---

## 1. Schema compliance — `docs/goals/long-term/reading-2026.md`

**PASS.**

Required universal fields checked against `docs/schemas/goal-frontmatter.md`:

- `id: reading-2026` — present, matches filename. PASS.
- `title` — present. PASS.
- `type: intellectual` — valid enum value. PASS.
- `status: active` — valid enum value. PASS.
- `priority: 3` — integer 1-9, consistent with ADR-0002 (reading = priority 3). PASS.
- `created_at: 2026-05-10` — ISO 8601 date. PASS.
- `target_date: null` — null is acceptable per schema. PASS.
- `references` — list present. PASS.
- `sessions_log: []` — present as empty list. PASS.
- `milestones: []` — present as empty list. Architect noted this is acceptable; schema says "always present, even as []." PASS.

`daily_tracking` block shape:
- `metric: pages` — PASS.
- `unit: count` — PASS.
- `input: session_log` — matches new canonical value added by ADR-0013. PASS.
- `daily_target: 35` — integer, soft target. PASS.
- `log: []` — present. PASS.

Reading-style list blocks: `currently_reading`, `to_read`, `finished` all present as `list[string]` with `"Author — Title"` shape. PASS.

No `slug:` field on the live file. PASS.

No fields outside the schema found.

---

## 2. ADR-0013 cross-reference resolution

**PASS.**

Links checked in the `Related` section of `docs/decisions/0013-reading-tracker-architecture.md`:

- `docs/decisions/0002-priority-ordering.md` — file exists. PASS.
- `docs/decisions/0012-canonical-goal-frontmatter-schema.md` — file exists. PASS.
- `docs/schemas/goal-frontmatter.md` — file exists. PASS.
- `docs/goals/long-term/reading-2026.md` — file exists. PASS.
- `docs/reading.md` — file exists. PASS.
- `docs/reading-log/` — directory exists (`docs/reading-log/2026-05.md` confirmed). PASS.
- "No `docs/projects/reading.md` exists" — Glob confirms no such file. Claim is accurate. PASS.

ADR voice spot-check: ADR-0013 follows the same structure (Status/Context/Decision/Consequences/Alternatives/Watch-for/Related) as ADRs 0010-0012. PASS.

---

## 3. Schema consistency — `docs/schemas/goal-frontmatter.md`

### `daily_tracking` type-agnostic promotion

**PASS.** The "Optional top-level blocks" section correctly documents `daily_tracking` as "Type-agnostic — any goal type may use `daily_tracking`" with live-use examples from both `stop-smoking-2026.md` (behavioral) and `reading-2026.md` (intellectual). The old "Type-specific blocks" section still covers behavioral-only constructs (`taper`, `maintenance`, `slip_protocol`, `triggers`, `method`) which is correct — those are behavioral-specific. No contradictory text claiming `daily_tracking` is behavioral-only remains anywhere in the document.

### Smoking example section header — fixed

The header previously read:

    ### Behavioral (smoking taper — `daily_tracking` plus universal `sessions_log: []`)

With `daily_tracking` now type-agnostic, the parenthetical was misleading. Fixed to:

    ### Behavioral (smoking taper)

One-line edit, applied.

### `slug:` lines in worked examples — fixed

The spec text in the "Required universal fields" section explicitly states: "`slug` is derived from filename... **not stored as a frontmatter field**. Do not add a `slug:` key to a goal file."

Five worked examples (Physical/marathon, Behavioral/smoking, Creative/screenplay, Purchase/buy-suit, Acquisition/cnc-shop) all carried `slug:` lines contradicting the spec. The intellectual/reading example (added in this session) correctly omitted it. All five stale `slug:` lines removed.

This was pre-existing debt; the reading-2026 session exposed it because the new intellectual example set the correct pattern.

### Intellectual worked example vs spec

**PASS.** The snippet example in the schema doc matches the live `reading-2026.md` shape exactly. `daily_target`, `session_log` input, and reading-style list blocks are consistent with the spec sections above the example.

---

## 4. Index and cross-reference updates

All edits applied:

**`docs/decisions/README.md`**
- Added ADR-0013 row: `| 0013 | 0013-reading-tracker-architecture.md | Accepted | 2026-05-10 |`
- Bumped "Next available" from 0013 to **0014**.

**`CLAUDE.md`**
- Updated ADR range from "Currently 0001–0012. Next available: 0013" to "Currently 0001–0013. Next available: 0014."

**`docs/ARCHITECTURE.md`**
- Updated ADR range from "Currently 0001–0012. Next available: 0013" to "Currently 0001–0013. Next available: 0014."
- Added `reading-2026.md` to the goal file list under the long-term goals section.

**`docs/schemas/goal-frontmatter.md`**
- Fixed smoking example section header (see section 3).
- Removed five stale `slug:` lines from worked examples (see section 3).
- No stale "Currently 0001-0010" reference found in the schema doc body.

---

## 5. Open issues

- **ADR-0007 drift (pre-existing, not introduced here):** ADR-0007 still references `docs/goals/long-term/cnc-shop-acquisition.md`; ARCHITECTURE.md notes it was moved to `docs/notes/2026-05-09-cnc-shop-acquisition.md`. The ADR body itself has not been updated. Flagged for architect.
- **`stop-smoking-2026.md` has no dedicated ADR (pre-existing, flagged in ARCHITECTURE.md).** Not introduced by this session.
- **Compass widget for `session_log` input type is unbuilt** — noted in ADR-0013 Consequences and the goal file's Open section. No substrate action required; Compass-repo work item.
- **Epictetus edition string** — the `finished` list entry `"Epictetus — Discourses (Penguin Classics)"` may not match the actual translation read. Noted as open in the goal file's narrative. No action for librarian.
