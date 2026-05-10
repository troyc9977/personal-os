# 0012: Canonical goal frontmatter schema

## Status

Accepted — 2026-05-10

## Context

A schema audit on 2026-05-10 (`docs/reviews/2026-05-10-goal-schema-audit.md`)
inventoried all five files in `docs/goals/long-term/` against
`docs/schemas/goal-frontmatter.md` and found 14 drift points: fields used in
files that the schema didn't document, fields documented in the schema that
no file used, naming variants where the spec, files, and Compass worker had
diverged, and shape choices where copy-paste from one example had spread a
field into goals where it carried no meaning.

The Compass worker (separate repo) had silently developed alias resolvers
for two of those drift points — `milestones[].done` ↔ `.status` and
`milestones[].target` ↔ `.date` — plus a multi-shape resolver in
`getCurrentCap()` for the tap-increment block. The worker resilience was
masking the drift rather than surfacing it.

Without a single canonical decision, future goal authors (architect drafts,
Troy hand-edits) would each reverse-engineer the spec from existing files,
and the worker's alias debt would keep growing. The same governance pattern
ADR-0010 applied to the habit list ("make the rule explicit so future drift
is caught early") applies here: write the rule down, let the librarian
enforce it.

## Decision

The canonical goal frontmatter schema is the rewritten
`docs/schemas/goal-frontmatter.md` (this commit). Every field's name, shape,
and presence rule there is binding. The 14 drift points from the audit are
resolved as follows.

Audit anchor: `docs/reviews/2026-05-10-goal-schema-audit.md`.

1. **`league:` — custom block on `acl-return-to-sport.md` (underspecified).**
   Promoted to an optional top-level block available to any goal type.
   Canonical shape: `{ league_start_target: date|null, league_start_earliest:
   date|null, readiness_gate: string|null, weekly_commitments: list[string] }`.
   `readiness_gate` is optional, required only when the earliest start is
   conditional (e.g. post-injury return).

2. **`triggers[]` shape (compliant — no drift).** The audit confirmed
   `{ description, note }` matches spec. Documented unchanged.

3. **`milestones[].done` vs `.status` (worker alias).** Canonical key is
   `done: bool`. The `status` alias is dropped from the spec. Compass worker
   can drop the alias in `worker/src/goals.ts` on its next deploy (separate
   repo task — out of scope here).

4. **`milestones[].target` vs `.date` (worker alias).** Canonical key is
   `target: date|null`. The `date` alias is dropped. Same Compass worker
   cleanup as #3.

5. **`daily_tracking.input` (single supported value).** Canonical shape
   confirmed: `{ metric, unit, input, log }`. `input: tap_increment` is
   noted as the only supported value in v1. The worker's multi-shape
   resolver in `getCurrentCap()` can simplify on next deploy.

6. **`phases[].long_run` used as null padding on non-running goals.**
   Resolution: `long_run` is **omittable entirely** (not just nullable).
   Include only on running-focused `physical` goals where the field carries
   meaning (e.g. `toronto-half-2026.md`). `acl-return-to-sport.md` and
   `screenplay-may-21.md` had `long_run: null` removed in this commit.

7. **`phases[]` on `creative` type (underspecified).** Resolution:
   `phases[]` is type-agnostic, applicable to any goal with a temporal arc.
   The original spec's restriction to `physical` and `behavioral` was a
   documentation error, not a design intent.

8. **`schedule[]` shape (compliant — minor gap).** Canonical shape
   `{ day, title }` with `day` enum `mon|tue|wed|thu|fri|sat|sun|every`.
   The schema now explicitly notes `schedule[]` is optional — many goals
   (e.g. `stop-smoking-2026.md`) have no fixed weekly cadence.

9. **`references[]` extended to goal files (underspecified).** Resolution:
   spec comment broadened to "any substrate paths this goal relates to —
   ADRs, project files, sibling goal files, annual/quarterly goal docs."
   Shape stays `list[string]`.

10. **`parent` and `subgoals` (overspecified — no live use).** Documented
    explicitly as "reserved for tree model, not yet in use." Authors omit
    both keys; Compass does not consume them. The librarian flags first
    live use as a schema-evolution event.

11. **`acquisition.decision_triggers[]` and `constraints[]` (overspecified
    — no live file).** Kept in the spec, noted as type-specific to
    `acquisition`, and flagged that no live `acquisition` goal file exists
    yet. Schematic example added.

12. **`purchase.target_amount` / `current_amount` (overspecified — no live
    file).** Kept in the spec, noted that the `buy-suit` example file does
    not exist yet. Schematic example added.

13. **`screenplay-may-21.md` Phase 4 `weeks` data error.** Phase 4 (Polish)
    had `weeks: "3"`, duplicating Phase 3 (Revise). Polish is a single-day
    sprint. Corrected to `weeks: "3 — May 21 only"`. Schema clarified that
    `weeks` accepts ranges (`"1-6"`), single weeks (`"3"`), or qualified
    strings (`"final day"`, `"3 — May 21 only"`).

14. **`sessions_log` missing on `stop-smoking-2026.md`.** Resolution:
    `sessions_log` is a required universal field, present on every file
    even as `[]`. For `behavioral` goals using `daily_tracking`, the per-day
    count log accumulates in `daily_tracking.log` (a separate, parallel
    append target); `sessions_log: []` stays present as a placeholder.
    `sessions_log: []` was added to `stop-smoking-2026.md` in this commit.

The schema also gains explicit required-universal fields beyond the prior
set (`created_at`, `sessions_log`, `milestones`) to make the universal/optional
distinction unambiguous.

### Universal-fields reconciliation (post-audit decision, 2026-05-10)

A follow-up pass after the initial schema rewrite reconciled the four
universal fields the audit flagged as missing across the 5 live goal files:

- `created_at` — back-filled across all 5 live goal files using each file's
  git first-commit date.
- `slug` — dropped from the frontmatter spec entirely. Derived from filename
  (basename minus `.md`) instead. No goal file ever stored it; this aligns
  the spec with reality.
- `review_date` — relaxed from required-universal to optional-universal.
  Include when a re-evaluation date is meaningfully scheduled; omit otherwise.
- `tags` — relaxed from required-universal to optional-universal. Include
  when meaningful labels exist; omit otherwise.

## Consequences

### Positive

- A single canonical spec future goal authors and the architect agent
  follow strictly. Drift is caught at authoring time, not at audit time.
- The Compass worker can drop the `status`/`date`/`done` aliases in
  `worker/src/goals.ts` on its next deploy (separate repo, out of scope
  here).
- The multi-shape resolver in `getCurrentCap()` for `daily_tracking` can
  simplify (also out of scope here).
- The architect agent file gains a "Goal-file schema discipline" section
  enforcing the canonical names and presence rules.

### Negative

- One-time edit cost across affected files (3 of 5 goal files touched).
  Marginal.
- Authors must update the schema doc when introducing a new field. This
  is a discipline, not a tool — the librarian's quarterly audit catches
  failures.

### Neutral

- Compass worker code changes are tracked separately in the Compass repo.
  This ADR doesn't ship them, only enables them.
- `decisions/README.md` and the ARCHITECTURE/CLAUDE references to ADR-0012
  are the librarian's next task.

## Alternatives considered

- **Per-field ADRs.** Rejected. 14 drift points → 14 ADRs would bury the
  through-line that there's a single canonical schema. One ADR per audit
  is cleaner.
- **Rewriting files to match a stricter spec rather than spec-to-files.**
  Rejected for fields where the file shape is more idiomatic (e.g. the
  `league:` block as authored on `acl-return-to-sport.md`, the
  `references[]` usage that includes goal files). The audit's heuristic —
  "actual usage is authoritative; the comment is what needs expanding" —
  guided most resolutions.
- **Defer the schema rewrite until the Compass worker is reconciled in
  parallel.** Rejected. The substrate change is independent of the worker
  change; coupling them would block both.

## Watch-for

- A new goal file introduces an ad-hoc field without a schema update.
  That's the failure mode this ADR exists to prevent — librarian flags.
- The Compass worker keeps the legacy aliases past the next deploy. That
  would be technical drift on the worker side; flag for the Compass repo.
- A second goal needs the `league:` block in a context with no readiness
  gate, and the field's optionality is questioned. The spec already
  handles this; the test is whether authors read the spec.

## Related

- `docs/reviews/2026-05-10-goal-schema-audit.md` — the audit this ADR resolves
- `docs/schemas/goal-frontmatter.md` — the canonical spec
- `docs/decisions/0010-add-gym-to-habits.md` — same governance pattern (make the rule explicit so future drift is caught early)
- `docs/decisions/0002-priority-ordering.md` — priority field references this
- `.claude/agents/architect.md` — agent now enforces canonical schema
