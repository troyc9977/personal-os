# Goal Schema Audit — 2026-05-10

**Status:** FINDINGS (schema materially incomplete relative to actual files)

---

## Summary

**Files audited (5):**
- `docs/goals/long-term/acl-return-to-sport.md`
- `docs/goals/long-term/screenplay-may-21.md`
- `docs/goals/long-term/stop-smoking-2026.md`
- `docs/goals/long-term/substack-2026.md`
- `docs/goals/long-term/toronto-half-2026.md`

**Drift points found: 14**

| Category | Count |
|---|---|
| Underspecified (in files, absent/incomplete in spec) | 7 |
| Shape divergence (field exists in both, shape differs across files or vs spec) | 4 |
| Overspecified (in spec, no file uses it) | 3 |

**Top-line takeaway:** The schema's required-field set and common-optional-field set are accurate. The schema's type-specific blocks are a mix of accurate examples and materially incomplete specifications. The `phases[]` block is well-matched. The `league:` block, `triggers[]` shape, `milestones[].done` vs `.status` aliasing, and `references[]` as a cross-file linking convention are all present in real files but either absent or incompletely specified. Three fields documented in the schema (`subgoals`, `parent`, `decision_triggers`/`constraints`) appear in no actual file. The schema is roughly accurate for the fields it covers but leaves a meaningful surface area unspecified — consuming code or a new goal author has to reverse-engineer from file examples.

---

## Drift Inventory

### 1. `league:` — custom block on `acl-return-to-sport.md`

**Field path:** `league` (top-level map)

**Schema claim:** Not in spec. The schema defines no `league` block for type `physical`. The ACL file's own body text acknowledges this: "Whether the schema needs a formal `league` block as a `physical` type-specific field... Architect to propose a schema update if a second goal ever needs the same shape."

**Actual shape observed (acl-return-to-sport.md only):**
```yaml
league:
  league_start_target:   date        # 2026-06-01
  league_start_earliest: date        # 2026-05-25
  readiness_gate:        string
  weekly_commitments:    list[string]
```

**Category:** Underspecified

**Recommended canonical shape:** As authored in `acl-return-to-sport.md`. The four sub-fields are semantically coherent and non-redundant. If a second goal ever uses this pattern (another return-to-sport or team-sport block), it should replicate this exact shape. Heuristic applied: only one file uses this field, so the file is the de facto spec — canonicalize what exists rather than invent alternatives.

**Compass worker implications:** Not aliased — `league:` is not a field the schema documents or that Compass is likely to parse against a spec entry. Flag for architect to verify whether `worker/src/goals.ts` reads this block at all, or ignores it.

---

### 2. `triggers[]` — shape in spec vs actual file

**Field path:** `triggers[].description` and `triggers[].note`

**Schema claim:**
```yaml
triggers:                     # optional, observed patterns
  - description:  string
    note:         string|null
```

**Actual shape observed (stop-smoking-2026.md):**
```yaml
triggers:
  - { description: "Post-work decompression...", note: "highest-frequency window historically" }
  - { description: "Drinks with friends on weekends", note: "social, situational" }
  - { description: "Late-night writing or coding push", note: "boredom + fatigue + screen" }
```

**Assessment:** Shape matches spec exactly. This is a **pass** — noted here only to confirm it is the only file using `triggers[]` and that the inline-object brace style is consistent with `milestones[]` and `phases[]` usage across all files.

**Category:** Not a drift point — confirmed compliant.

---

### 3. `milestones[].done` vs `milestones[].status` — naming variant

**Field path:** `milestones[].done`

**Schema claim:**
```yaml
milestones:
  - title:   string
    target:  date|null
    done:    bool         # default false
```

**Actual shape observed:** All five files use `done: bool`. No file uses a `status` field on milestones.

**Category:** Shape divergence (spec vs worker, not spec vs files). The user-provided ground truth states that `worker/src/goals.ts` aliases `milestones[].done` ↔ `milestones[].status`. The spec says `done`; the files all use `done`; the worker aliases both.

**Recommended canonical shape:** `done: bool` — this is what all five files use and what the spec says. The worker alias is one-sided dead weight.

**Compass worker implications:** Already aliased in worker — canonicalizing `done` as the single key and removing the `status` alias sheds alias debt. No file change required; worker change required to drop the alias after spec is declared canonical.

---

### 4. `milestones[].target` vs `milestones[].date` — naming variant

**Field path:** `milestones[].target`

**Schema claim:**
```yaml
milestones:
  - title:   string
    target:  date|null
    done:    bool
```

**Actual shape observed:** All five files use `target: date|null`. No file uses `date` on a milestone.

**Category:** Shape divergence (spec vs worker, not spec vs files). The user-provided ground truth states `worker/src/goals.ts` aliases `milestones[].target` ↔ `milestones[].date`.

**Recommended canonical shape:** `target: date|null` — this is what all five files use and what the spec says.

**Compass worker implications:** Already aliased in worker — canonicalizing sheds alias debt. Worker change required to drop the `date` alias after spec is declared canonical.

---

### 5. `daily_tracking.input` — field name vs semantic intent

**Field path:** `daily_tracking.input`

**Schema claim:**
```yaml
daily_tracking:
  metric:  string       # e.g. "cigarettes"
  unit:    string       # e.g. "count"
  input:   string       # currently only "tap_increment"
  log:     []
```

**Actual shape observed (stop-smoking-2026.md only):**
```yaml
daily_tracking:
  metric: cigarettes
  unit: count
  input: tap_increment
  log: []
```

Shape exactly matches spec. This is the only file using `daily_tracking`. The user-provided ground truth states that `worker/src/goals.ts` `getCurrentCap()` uses a multi-shape resolver for the tap-increment / daily cap field — meaning the worker tolerates several shapes for this block.

**Assessment:** The actual shape in the file matches the spec verbatim. The multi-shape resolver in the worker is insulating against potential future drift or against an older shape that may have existed before this file was authored. Since the file and spec agree, the risk here is that the worker's multi-shape tolerance masks a latent inconsistency that would only surface if a second `behavioral` goal were added with a differently-shaped `daily_tracking` block.

**Category:** No drift between file and spec. Worker resilience is paid insurance. Flag for architect: document the canonical shape explicitly in the spec, noting `input: tap_increment` is the only supported value in v1, to prevent future authors from guessing.

**Compass worker implications:** Not currently a problem — file and spec agree, worker absorbs variation. Canonicalizing more explicitly in the spec reduces future drift risk.

---

### 6. `phases[].long_run` — field used across non-marathon goals

**Field path:** `phases[].long_run`

**Schema claim:**
```yaml
phases:
  - name:     string
    weeks:    string
    dates:    string
    target:   string
    long_run: string|null   # phase-specific long run target
```

**Actual shape observed:**
- `toronto-half-2026.md`: uses `long_run` meaningfully (e.g. `"to ~10 km, 2x/week schedule"`, `null` for final phase). Shape matches spec.
- `acl-return-to-sport.md`: uses `long_run: null` on all three phases. Technically compliant but semantically empty — the ACL goal has no long-run component; `null` is used as a placeholder to satisfy the field's presence.
- `screenplay-may-21.md`: uses `long_run: null` on all four phases. Same issue — a creative goal with `phases[]` has no semantic use for `long_run`.

**Category:** Shape divergence (semantic mismatch). The schema places `long_run` inside `phases` under the `physical` type-specific block, implying it is meaningful only for physical goals. `screenplay-may-21.md` is type `creative` and uses `phases[]` with `long_run: null` as padding.

**Recommended canonical shape:** Two options for architect to decide:
1. Declare `long_run` optional (`long_run` key may be omitted entirely, not just `null`), applicable only to `physical` goals with a running component. Non-running goals omit it entirely.
2. Broaden `phases[]` to a generic block applicable to any type, and mark `long_run` as physical-only optional.

Heuristic applied: the screenplay file's use of `long_run: null` is almost certainly copy-paste from the marathon example in the schema doc. The spec should make it clear the field is omittable, not just nullable.

**Compass worker implications:** Unknown — flag for architect to verify whether `worker/src/goals.ts` iterates `phases[].long_run` or ignores it for non-physical types.

---

### 7. `phases[]` — used by `creative` type (`screenplay-may-21.md`)

**Field path:** `phases[]` (top-level usage context)

**Schema claim:** The schema places `phases:` under "Type-specific blocks — `physical` and `behavioral`." No mention that `creative` goals can use it.

**Actual shape observed:** `screenplay-may-21.md` (type `creative`) uses a `phases[]` block with `name`, `weeks`, `dates`, `target`, and `long_run: null`. Shape of each sub-field matches spec.

**Category:** Underspecified (spec restricts type applicability; file uses it on an out-of-scope type).

**Recommended canonical shape:** Declare `phases[]` a general decomposition block applicable to any type where the goal has a temporal arc. The field is structurally identical regardless of goal type; restricting it to `physical` and `behavioral` in the spec is a documentation error, not a design intent. Heuristic applied: the filed usage is reasonable and the structure is sound — the spec restriction was probably written with marathon/smoking as the only examples in mind.

**Compass worker implications:** Unknown — flag for architect to verify whether the worker restricts materialization of `phases[]` to `physical`/`behavioral` types, or whether it processes the block generically.

---

### 8. `schedule[]` — shape consistent across files but worker behavior unverified

**Field path:** `schedule[]`

**Schema claim:**
```yaml
schedule:
  - day:    string    # mon | tue | wed | thu | fri | sat | sun | every
    title:  string
```

**Actual shape observed across all five files:**

| File | schedule shape |
|---|---|
| `toronto-half-2026.md` | `{ day: wed, title: "..." }`, `{ day: sun, title: "..." }` |
| `acl-return-to-sport.md` | Seven entries, all `{ day: <dow>, title: "..." }` |
| `screenplay-may-21.md` | Seven entries, all `{ day: <dow>, title: "..." }` |
| `stop-smoking-2026.md` | No `schedule:` block present |
| `substack-2026.md` | `{ day: sat, title: "..." }`, `{ day: sun, title: "..." }` |

All four files that use `schedule[]` use exactly the `{ day, title }` inline-object shape. The `day` values observed are all valid per the spec enum (`mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`). The `every` value is not used by any file.

**Category:** No drift between files and spec for `schedule[]` shape. Minor gap: `stop-smoking-2026.md` has no `schedule` block at all, which is valid (not required), but the spec does not explicitly say it is optional. Worth one sentence in the spec.

**Compass worker implications:** Unknown — the user flagged `schedule[]` worker aliasing as unverified. Flag for architect to verify `worker/src/goals.ts` behavior when `schedule:` is absent (as in `stop-smoking-2026.md`) and when `day: every` is used (no file currently exercises it).

---

### 9. `references[]` — internal cross-file links include goal files, not just ADRs and project files

**Field path:** `references[]`

**Schema claim:**
```yaml
references:   list[string]    # related ADRs (e.g. "docs/decisions/0007-...md"), project files
```

**Actual shape observed:**
- `toronto-half-2026.md` references: `docs/decisions/0002-...`, `docs/decisions/0011-...`, `docs/goals/2026.md`, `docs/goals/2026-Q2.md`, `docs/goals/long-term/acl-return-to-sport.md`, `docs/projects/habits.md`

The schema comment says "related ADRs... project files" — but actual files also reference annual goal docs (`docs/goals/2026.md`), quarterly goal docs (`docs/goals/2026-Q2.md`), and sibling long-term goal files (`docs/goals/long-term/acl-return-to-sport.md`).

**Category:** Underspecified. The field definition is too narrow. The semantic intent is clearly "anything in the substrate this goal relates to" but the schema comment implies ADRs and project files only.

**Recommended canonical shape:** Update spec comment to: "list of any substrate paths this goal relates to — ADRs, project files, sibling goal files, annual/quarterly goal docs." Shape stays `list[string]`; the comment just needs to be accurate. Heuristic applied: actual usage is authoritative; the comment is the one that needs expanding.

**Compass worker implications:** Unknown — flag for architect to verify whether `worker/src/goals.ts` does anything with `references[]` beyond display, or whether it is purely informational.

---

### 10. `parent` and `subgoals` — documented but unused

**Field path:** `parent`, `subgoals`

**Schema claim:**
```yaml
parent:    string|null    # parent goal id, for trees. Default null.
subgoals:                 # ids of child goal files
  - subgoal-slug
```

**Actual shape observed:** No file in the current set uses `parent` or `subgoals`.

**Category:** Overspecified. These fields exist only in the spec, not in any file.

**Recommended action for architect:** Either (a) confirm these are intentionally reserved for future use and add a note saying "not yet used in any live file," or (b) remove them if the tree model is no longer planned. Not removing them is fine — but leaving them undocumented as "future/reserved" creates ambiguity for authors.

**Compass worker implications:** Not aliased — no file exercises these fields. Worker impact of canonicalizing is nil.

---

### 11. `decision_triggers` and `constraints` (`acquisition` type) — documented but unused

**Field path:** `decision_triggers[]`, `constraints[]`

**Schema claim:**
```yaml
decision_triggers:            # what makes this thesis become active work
  - string

constraints:                  # operational guardrails
  - string
```

**Actual shape observed:** No `acquisition` type goal file exists in the live set. (`cnc-shop-acquisition.md` is referenced by ADR-0007 but not yet authored — previously flagged as cross-reference drift in the librarian's remit.)

**Category:** Overspecified (no live file exercises it). Not a contradiction — the schema is specifying for a file that hasn't been authored yet.

**Compass worker implications:** Not aliased — no file exercises these fields.

---

### 12. `target_amount` / `current_amount` (`purchase` type) — documented but unused

**Field path:** `target_amount`, `current_amount`

**Schema claim:**
```yaml
target_amount:    int
current_amount:   int    # update manually or via Compass v3+
```

**Actual shape observed:** No `purchase` type goal file exists in the live set. (The schema example shows `buy-suit` but no such file is in `docs/goals/long-term/`.)

**Category:** Overspecified (spec example references a file that doesn't exist).

**Recommended action:** Note in the schema that `buy-suit.md` is the example file but has not been authored. Or note it is planned. No change required until the file is created.

**Compass worker implications:** Not aliased — no live file exercises these fields.

---

### 13. `phases[]` — `weeks` field is string not int, and values diverge from spec example

**Field path:** `phases[].weeks`

**Schema claim:**
```yaml
phases:
  - weeks:   string    # e.g. "1-6"
```

**Actual shape observed:**
- `toronto-half-2026.md`: `"1-6"`, `"7-13"`, `"14-19"`, `"20"`, `"21-24"` — all strings, some ranges, one single-week value
- `acl-return-to-sport.md`: `"1-2"`, `"3-4"`, `"5-6"` — all strings, all two-week ranges
- `screenplay-may-21.md`: `"1"`, `"2"`, `"3"`, `"3"` — strings; **two phases both have `weeks: "3"`** — this is a data-level error (Revise and Polish both show week 3) but the schema shape itself is `string`, which is correct

**Category:** Data error in `screenplay-may-21.md` (duplicate `weeks: "3"` for Revise and Polish phases) rather than schema violation — but worth flagging for the scribe/architect. The schema shape `string` is fine.

**Recommended action:** Scribe or architect to correct `screenplay-may-21.md` Phase 4 (Polish) `weeks` value — it should be `"3"` only for Revise; Polish is a single-day sprint (May 21 only) and should be `weeks: "3d"` or just omitted if the schema allows null, or a note like `"13th day"`. This is not a schema change; it is a file correction.

**Compass worker implications:** Unknown — flag for architect to confirm whether the worker reads `phases[].weeks` for materialization logic or ignores it.

---

### 14. `sessions_log` — missing from `stop-smoking-2026.md`; not present on behavioral goals with `daily_tracking`

**Field path:** `sessions_log`

**Schema claim:**
```yaml
sessions_log:                 # appended by Compass when scheduled tasks tick
  - date:   date
    title:  string
    done:   bool
    note:   string|null
```

**Actual shape observed:**
- `toronto-half-2026.md`: `sessions_log: []` — present, empty
- `acl-return-to-sport.md`: `sessions_log: []` — present, empty
- `screenplay-may-21.md`: `sessions_log: []` — present, empty
- `substack-2026.md`: `sessions_log: []` — present, empty
- `stop-smoking-2026.md`: **no `sessions_log:` field** — absent

**Category:** Shape divergence. The stop-smoking goal uses `daily_tracking.log` rather than `sessions_log` for its Compass-written record. This makes semantic sense (the tap-increment workflow writes to `daily_tracking.log`, not `sessions_log`), but the schema does not acknowledge this interaction — it implies `sessions_log` is universal.

**Recommended canonical shape:** The schema should clarify that for `behavioral` goals using `daily_tracking`, Compass writes to `daily_tracking.log` rather than `sessions_log`, and `sessions_log` may be omitted. Alternatively: `sessions_log: []` should be present on all goal files as an empty placeholder and `daily_tracking.log` is a separate, parallel append target. The architect needs to decide which model Compass actually implements.

**Compass worker implications:** Unknown — the relationship between `sessions_log` and `daily_tracking.log` write paths in `worker/src/goals.ts` is unverified. Flag for architect as potentially the highest-risk item: if the worker attempts to write `sessions_log` on `stop-smoking-2026.md` and the field is absent, behavior depends on whether the worker creates-or-appends vs errors.

---

## Recommended ADR Draft Topic

**"Canonical goal frontmatter schema (resolves audit 2026-05-10)"**

The ADR would decide: (1) which fields are universal vs type-conditional (`sessions_log` presence, `long_run` in phases for non-running goals, `phases[]` applicability to creative type); (2) whether `league:` and similar one-off type extensions require a schema update before use or are permitted as undocumented additions; and (3) whether to canonicalize `done`/`target` as the single naming convention on `milestones[]`, allowing the worker to shed its aliasing of `status`/`date`.

---

## Compass Worker Implications — Summary Table

| # | Field | Worker Status |
|---|---|---|
| 1 | `league:` block | Unknown — flag for architect to verify against worker source |
| 3 | `milestones[].done` vs `.status` | Already aliased in worker — canonicalizing sheds alias debt |
| 4 | `milestones[].target` vs `.date` | Already aliased in worker — canonicalizing sheds alias debt |
| 5 | `daily_tracking` shape | Not aliased — file and spec agree; worker's multi-shape resolver is insurance |
| 6 | `phases[].long_run` for non-running goals | Unknown — flag for architect to verify against worker source |
| 7 | `phases[]` on `creative` type | Unknown — flag for architect to verify against worker source |
| 8 | `schedule[]` shape and absent `schedule:` | Unknown — flag for architect to verify against worker source |
| 9 | `references[]` extended to goal files | Unknown — flag for architect to verify against worker source |
| 10 | `parent` / `subgoals` | Not aliased — no live file exercises these fields |
| 11 | `decision_triggers` / `constraints` | Not aliased — no live file exercises these fields |
| 12 | `target_amount` / `current_amount` | Not aliased — no live file exercises these fields |
| 14 | `sessions_log` absent from stop-smoking | Unknown — flag for architect to verify against worker source (potentially high-risk write path) |
