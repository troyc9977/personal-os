# Validation: ACL block + screenplay goal files, ADR-0011, toronto-half-2026 amendment

**Status:** PASS with flagged drift items (none blocking)

**Date:** 2026-05-10
**Scope:** `docs/goals/long-term/acl-return-to-sport.md` (new), `docs/goals/long-term/screenplay-may-21.md` (new), `docs/decisions/0011-acl-block-priority-over-marathon-phase-1.md` (new), `docs/goals/long-term/toronto-half-2026.md` (modified)

---

## Schema validation

### `acl-return-to-sport.md`

Required fields: all present and valid.

- `id: acl-return-to-sport` — matches filename. PASS.
- `title` — present. PASS.
- `type: physical` — valid enum value. PASS.
- `status: active` — valid. PASS.
- `target_date: 2026-06-20` — ISO 8601. PASS.
- `priority: 8` — in range 1-9. PASS.
- `references` — present, all four referenced files verified on disk (see cross-references below). PASS.
- `milestones` — well-formed list with `title`, `target`, `done`. PASS.
- `phases` — valid for `physical` type per schema. PASS.
- `schedule` — valid day-of-week entries. PASS.
- `sessions_log: []` — valid. PASS.

**Non-schema field: `league:`** — flat map with four sub-fields (`league_start_target`, `league_start_earliest`, `readiness_gate`, `weekly_commitments`). This field is not in the current schema. The architect flagged this as a one-off in the file's "Open" section, and the schema's "Schema evolution" section explicitly anticipates one-off additions before formalizing.

Recommendation: hold at one-off for now. A `league` or `return_to_sport` block in the schema is worth adding only when a second goal needs the same shape. No second case exists today. Flag for architect at next goal-file authoring session that touches `physical` + return-to-sport semantics.

### `screenplay-may-21.md`

Required fields: all present and valid.

- `id: screenplay-may-21` — matches filename. PASS.
- `title` — present. PASS.
- `type: creative` — valid enum value. PASS.
- `status: active` — valid. PASS.
- `target_date: 2026-05-21` — ISO 8601. PASS.
- `priority: 6` — in range 1-9; aligns with ADR-0002 writing/creative at #6. PASS.
- `references` — present (2 entries). PASS.
- `milestones` — well-formed. PASS.
- `phases` — present; `physical` and `behavioral` are the types listed as phase-appropriate in the schema, but the schema body says phases describe "ramped efforts" and does not formally restrict phases to only those types. `creative` with a phased sprint is a reasonable use of the block. Flag as a minor schema ambiguity for the architect — not a blocking violation.
- `schedule` — all seven days present; valid day-of-week entries. PASS.
- `sessions_log: []` — valid. PASS.

`related_goals: []` and `related_decisions: []` — these fields are NOT in the schema. The schema uses `references` (list of strings) for related ADRs and project files, not separate `related_goals` / `related_decisions` keys. Checking the file again: these fields do NOT appear in either new goal file's frontmatter (grep confirmed no matches). The task description noted they'd be empty and intentional — but they don't exist in the YAML at all, which is the correct schema-compliant behavior. PASS.

### `toronto-half-2026.md` (modified)

All required fields remain valid. Phase descriptions updated with ADR-0011 amendment text. Schedule reduced to 2 days (wed + sun), reflecting the eased Phase 1. All schema fields intact. PASS.

---

## Cross-references

### ADR-0011 references

- `docs/goals/long-term/acl-return-to-sport.md` — exists on disk. PASS.
- `docs/goals/long-term/toronto-half-2026.md` — exists on disk. PASS.
- `docs/decisions/0002-priority-ordering.md` — exists on disk. PASS.
- `docs/decisions/0010-add-gym-to-habits.md` — exists on disk. PASS.

### `acl-return-to-sport.md` references

- `docs/decisions/0011-acl-block-priority-over-marathon-phase-1.md` — exists. PASS.
- `docs/decisions/0002-priority-ordering.md` — exists. PASS.
- `docs/decisions/0010-add-gym-to-habits.md` — exists. PASS.
- `docs/projects/habits.md` — exists. PASS.
- `docs/goals/long-term/toronto-half-2026.md` (in `## Related` body) — exists. PASS.

### Reciprocity: `acl-return-to-sport.md` ↔ `toronto-half-2026.md`

- `acl-return-to-sport.md` lists `toronto-half-2026.md` in `## Related`. PASS.
- `toronto-half-2026.md` lists `acl-return-to-sport.md` in both `references` frontmatter and `## Related` body. PASS.
- `toronto-half-2026.md` lists ADR-0011 in both `references` frontmatter and `## Related` body. PASS.

Reciprocity is fully satisfied.

### `screenplay-may-21.md` references

- `docs/decisions/0002-priority-ordering.md` — exists. PASS.
- `docs/identity.md` — exists. PASS.
- Empty `related_goals` / `related_decisions`: N/A (fields not present in frontmatter; intentional per task brief). PASS.

---

## ADR index update

**What was changed:** `docs/decisions/README.md` was stale — it contained no index table at all, only the pattern/discipline prose. Added a full index table for ADRs 0001–0011 in numerical order with status and date, plus "Next available: 0012."

Status notes in the index:
- ADR-0004: marked "Accepted (launch timing superseded by 0009)" — ADR-0009 explicitly says it supersedes the launch-timing portion while leaving the preconditions framework.
- ADR-0005: marked "Accepted (amended by 0010)" — ADR-0010 explicitly says it amends ADR-0005.
- All others: Accepted.

---

## CLAUDE.md + ARCHITECTURE.md updates

### CLAUDE.md

**Changed:**
- `decisions/NNNN-*.md` description: was "Currently 0001–0006 committed; several pending" → updated to "Currently 0001–0011. Next available: 0012."
- Librarian description: removed stale "ADRs backing stop-smoking-2026.md and substack-2026.md are still to be authored" language. Replaced with accurate current state:
  - ADR-0007 references `goals/long-term/cnc-shop-acquisition.md` (moved to notes — flagged drift).
  - ADR-0009 references `goals/long-term/substack-2026.md` — now authored.
  - `stop-smoking-2026.md` now authored but has no dedicated ADR (flagged).

### ARCHITECTURE.md

**Changed:**
- ADR section: "Currently 0001–0006 committed" → "Currently 0001–0011. Next available: 0012."
- Goals long-term section: replaced the stale list (which included `cnc-shop-acquisition.md` and omitted `acl-return-to-sport.md` and `screenplay-may-21.md`) with the accurate five-file list. Added a note about the `cnc-shop-acquisition.md` move to notes and the ADR-0007 reference drift.

---

## Preexisting drift

### ADR-0007 → `goals/long-term/cnc-shop-acquisition.md` (broken reference)

ADR-0007 (`heritage-and-cnc-time-horizons`) contains two references to `goals/long-term/cnc-shop-acquisition.md`:

1. Decision section: "Becomes its own goal file at `goals/long-term/cnc-shop-acquisition.md`."
2. Related section: `goals/long-term/cnc-shop-acquisition.md (to be authored)`

The file was moved to `docs/notes/2026-05-09-cnc-shop-acquisition.md` (confirmed present on disk). The goal file path no longer exists.

**Assessment:** The ADR body text would need two updates — the Decision section and the Related section. Both require judgment about whether the CNC thesis is "deferred" (goal file was never formally authored and the target moved to notes) vs. "active under a different container." This is a substantive characterization call, not a trivial one-line fix. Flagged for architect. Do not edit the ADR body unilaterally.

### ADR-0009 → `goals/long-term/substack-2026.md` (was "to be authored")

ADR-0009 Related section: `goals/long-term/substack-2026.md (to be authored)`. File is now present on disk. The "(to be authored)" annotation in the ADR body is now stale but harmless. Flagged for architect to clean up in a future ADR-0009 body edit if desired. Low priority.

### `stop-smoking-2026.md` — no dedicated backing ADR

The goal file exists and references `docs/decisions/0002-priority-ordering.md` but has no dedicated ADR covering the decision to quit smoking or the specific taper method. The schema example shows `stop-smoking-2026.md` with a `behavioral` type including a full taper; the goal file on disk may or may not match. This is a content question for the architect.

### `phases` block on `creative` type goals

The schema documents `phases` under "physical and behavioral" types only. `screenplay-may-21.md` uses phases for a creative sprint. The schema is ambiguous — it doesn't explicitly forbid phases on other types; it just doesn't document the use. Flagged for architect: either the schema should be broadened to "physical, behavioral, and time-boxed creative sprints" or it should explicitly note that phases are valid wherever a goal has distinct sequential stages.

---

## Compass parser-format compliance

N/A this round — no daily/weekly/inbox edits.

---

## Summary

All four files pass schema validation. All cross-references resolve. Reciprocity between `acl-return-to-sport.md` and `toronto-half-2026.md` is complete. ADR index updated (0001–0011). CLAUDE.md and ARCHITECTURE.md corrected for the stale ADR count and goal-file list. Three flagged items for architect: ADR-0007 broken reference (needs judgment call), ADR-0009 stale "(to be authored)" annotation (low priority), and schema ambiguity around `phases` on non-physical types.
