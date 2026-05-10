# Validation: Canonical schema work (ADR-0012 + schema rewrite + goal-file edits)

**Date:** 2026-05-10
**Status:** PASS (with two open items flagged below)

---

## 1. Schema compliance — per-file results

Validated all 5 files in `docs/goals/long-term/` against `docs/schemas/goal-frontmatter.md`.

### `acl-return-to-sport.md` — PASS

- All required universal fields present: `id`, `title`, `type`, `status`, `priority`, `created_at`, `target_date`, `references`, `sessions_log`, `milestones`. Check.
- `milestones[]` uses canonical `{ title, target, done }`. No `status`/`date` aliases. Check.
- `phases[]` uses `{ name, weeks, dates, target }`. No `long_run` key anywhere in the phases block. Check (correct — `long_run` was removed per ADR-0012 item 6).
- `schedule[]` uses `{ day, title }` with valid enum values. Check.
- `league:` block matches canonical shape: `league_start_target`, `league_start_earliest`, `readiness_gate`, `weekly_commitments`. Check.
- No `slug` field. Check.

### `screenplay-may-21.md` — PASS

- All required universal fields present. Check.
- `milestones[]` uses canonical `{ title, target, done }`. Check.
- `phases[]` uses `{ name, weeks, dates, target }` — no `long_run` key. Check (correctly removed).
- Phase 4 (Polish) `weeks: "3 — May 21 only"` — corrected from the duplicate `"3"`. Check.
- `schedule[]` uses `{ day, title }` with valid enum values. Check.
- No `slug` field. Check.

### `stop-smoking-2026.md` — PASS

- All required universal fields present including `sessions_log: []`. Check (was added per ADR-0012 item 14).
- `milestones[]` uses canonical `{ title, target, done }`. Check.
- `daily_tracking` uses `{ metric, unit, input, log }` shape. `input: tap_increment`. Check.
- `taper`, `maintenance`, `slip_protocol`, `triggers` blocks present and valid.
- `schedule` absent — correct per schema (optional; `stop-smoking-2026.md` has no fixed weekly cadence).
- No `slug` field. Check.

### `substack-2026.md` — PASS

- All required universal fields present. Check.
- `milestones[]` uses canonical `{ title, target, done }`. Check.
- `schedule[]` uses `{ day, title }`. Check.
- No `phases[]` block — correct for this goal (no temporal arc requiring phases).
- No `slug` field. Check.

### `toronto-half-2026.md` — PASS

- All required universal fields present. Check.
- `milestones[]` uses canonical `{ title, target, done }`. No `status`/`date` aliases. Check.
- `phases[]` uses `{ name, weeks, dates, target, long_run }` — `long_run` present and meaningful on this running goal only. Final phase uses `long_run: null` (acceptable: the key is present but the phase carries no meaningful long-run target). Check.
- `schedule[]` uses `{ day, title }`. Check.
- `stretch` block present with `goal`, `decision_date`, `decision_rule`. Check.
- No `slug` field. Check.

---

## 2. ADR-0012 cross-reference resolution

- `docs/decisions/0010-add-gym-to-habits.md` (Referenced in Related section): **resolves** — file confirmed present.
- `docs/reviews/2026-05-10-goal-schema-audit.md` (Quoted in both Decision section and Related section): **resolves** — file confirmed present.
- The Decision section's 14-point list was spot-checked against the audit report on items 1, 6, 13, and 14:
  - Item 1 (`league:` block): ADR says "promoted to optional top-level block available to any goal type" — matches audit finding and current schema. Check.
  - Item 6 (`long_run` omittable entirely): ADR says "acl-return-to-sport.md and screenplay-may-21.md had `long_run: null` removed in this commit" — confirmed absent in both files. Check.
  - Item 13 (screenplay Phase 4 `weeks` correction): ADR says corrected to `weeks: "3 — May 21 only"` — confirmed in file. Check.
  - Item 14 (`sessions_log` missing from stop-smoking): ADR says added `sessions_log: []` — confirmed present in file. Check.

No resolution failures.

---

## 3. Architect agent consistency

Read `.claude/agents/architect.md` "Goal-file schema discipline" section (lines 84-97). Findings:

- "Required universal fields are present on every file, even when empty (`sessions_log: []`, `tags: []`, `references: []`)" — **minor misalignment**: the canonical schema relaxed `tags` and `review_date` from required-universal to optional-universal (ADR-0012 post-audit decision, lines 125-128 of the ADR). The architect section lists `tags: []` as something that must be present. This contradicts the schema's "include when meaningful labels exist; omit otherwise." `references: []` is correct (required-universal). `sessions_log: []` is correct (required-universal). `tags: []` should be "omit when not meaningful" not "always present."
- "Use canonical names. No variants — `target` not `date`, `done` not `status`." — correctly states canonical names. Check.
- "`phases[].long_run` is omittable entirely. Don't pad non-running goals with `long_run: null`." — correct. Check.
- "Introducing a new type-specific field requires updating the schema doc in the same change." — correct, matches schema's evolution section. Check.
- The section correctly references ADR-0012 by name.

**One misalignment flagged:** `tags: []` listed as a required-always-present field when the schema (and ADR-0012) relaxed it to optional. This is an architect.md content issue — not something the librarian edits (`.claude/agents/` is off-limits). Flagged for Troy/architect to correct in the next agents-file update.

**Also flagged (unrelated to schema discipline section):** architect.md line 18 still says "currently the next is **0011**" — stale after ADR-0012 landed. Same agents-file update should correct to 0013.

---

## 4. Index / cross-reference updates performed

- `docs/decisions/README.md` — added ADR-0012 row; updated "Next available" to 0013.
- `CLAUDE.md` — updated ADR count from "0001–0011. Next available: 0012" to "0001–0012. Next available: 0013".
- `docs/ARCHITECTURE.md` — updated same count in the ADR section.

No other structural changes were required. ARCHITECTURE.md's goal-file listing is current (all 5 live files correctly enumerated).

---

## 5. Open issues

1. **`tags` in architect.md schema discipline section** — states `tags: []` is required-always-present. Schema says optional (omit when not meaningful). Architect.md is off-limits for the librarian; Troy or architect should correct this in the next agents-file session.

2. **`architect.md` next-ADR number stale** — line 18 says next is 0011. Should be 0013. Same agents-file update as above.

3. **Pre-existing drift not resolved by this work** — ADR-0007 still references `docs/goals/long-term/cnc-shop-acquisition.md` which does not exist (moved to `docs/notes/2026-05-09-cnc-shop-acquisition.md`). This was known drift before this session; not introduced by ADR-0012 work. Flagged for architect.
