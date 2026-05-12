# Validation: RidingPulse Pivot — 2026-05-12

**Status:** PASS (no schema blockers; content drift flagged for Troy and scribe)

---

## Summary

ADR-0014, `ridingpulse.md`, and `dcc-productivity.md` landed cleanly. Goal files
`substack-2026.md` and `screenplay-may-21.md` pass schema validation. The project
rename from WardForge to RidingPulse is mechanically complete in the cross-reference
layer. Content drift (prose that still says "WardForge", "October 26 launch", etc.)
is isolated to off-limits files and one outdated project file (`substack.md`) — none
of it blocks ship, but it does need a scribe or Troy pass to stay coherent.

---

## Writes made by librarian

| File | What changed |
|------|-------------|
| `docs/decisions/README.md` | Added ADR-0014 row; bumped "Next available" from 0014 to 0015 |
| `README.md` | Rewrote "WardForge operational substrate ... `docs/projects/wardforge.md`" to RidingPulse / `ridingpulse.md` |
| `docs/ARCHITECTURE.md` | Three edits: (1) project file inventory list updated `wardforge.md` → `ridingpulse.md`; (2) "Where things should NOT live" path reference updated `wardforge.md` → `ridingpulse.md`; (3) ADR count bumped 0001–0013 → 0001–0014, next available 0015 |
| `CLAUDE.md` | Four edits: (1) project file examples list updated `wardforge.md` → `ridingpulse.md`; (2) ADR count bumped 0001–0013 → 0001–0014, next available 0015; (3) leak-check hook description updated `docs/projects/wardforge.md` → `docs/projects/ridingpulse.md`; (4) librarian example note updated to reflect ADR-0009/ADR-0014 partial-supersede state |

**Not rewritten (prose-only, not broken link targets):**

- `docs/decisions/0014-ridingpulse-pivot.md` line 95: "project file moves from `wardforge.md` to `ridingpulse.md`" — historical prose, correct as-is.
- `docs/projects/ridingpulse.md` lines 38, 40: references to "previous `wardforge.md`" — historical prose, correct as-is.
- `.claude/agents/scribe.md` line 126: `docs/projects/wardforge.md` in prose — off-limits per CLAUDE.md; flagged below.
- `.claude/agents/librarian.md` line 25: `projects/wardforge.md` example slug — off-limits per CLAUDE.md; flagged below.
- `docs/weekly/2026-05.md` line 68: "WardForge — first 5 customer contacts" — Compass-managed file; off-limits; flagged below.

---

## Cross-references validated as correct

- `docs/decisions/README.md` — now lists ADR-0014; next available 0015. Sequence 0001–0014 contiguous, no gaps.
- `docs/goals/long-term/substack-2026.md` — references ADR-0014, ADR-0009, ADR-0004, ADR-0002, `ridingpulse.md`, `substack.md`, `identity.md`. All targets verified present.
- `docs/goals/long-term/screenplay-may-21.md` — references ADR-0014, ADR-0002, `identity.md`. All verified present.
- `docs/projects/ridingpulse.md` — references ADR-0014, ADR-0002, ADR-0011, `substack-2026.md`, `identity.md`. All verified present.
- `docs/projects/dcc-productivity.md` — references `dcc.md`, `dcc-qa-tool.md`, ADR-0002. All verified present.
- `docs/decisions/0014-ridingpulse-pivot.md` — references ADR-0002, ADR-0009, ADR-0011, `ridingpulse.md`, `substack-2026.md`. All verified present.

---

## Content drift requiring Troy's attention

### Off-limits files (read-only — architect or Troy must edit)

**`docs/identity.md`**
- Line 39: "**WardForge** — technology cylinder of the project. Phase 1 launches October 26, 2026. Phase 2 expands to provincial, federal, and the permissioned political intelligence network. This is the primary work-life vehicle through 2029."
  — Still names WardForge; October 26, 2026 launch date; Phase 2 as written is the old framing.
- Line 40: "**Substack and writing practice** — public-facing intellectual track. Biweekly cadence starting fall 2026. *Comment Magazine* as first target publication."
  — Fall 2026 / Comment Magazine as gate are superseded by ADR-0014 (June 30, publication-first).
- Line 47: "The cultural-output cylinder of the 25-year project (filmmaking, writing) is largely dormant for the next ~18 months while WardForge consumes available bandwidth"
  — "WardForge" name.

**`docs/goals/2026.md`**
- Line 9: "**Ship WardForge Phase 1 by October 26.** With at least 1 real user."
  — WardForge name; October 26 hard deadline; these are superseded.
- Line 11: "**Substack public launch.** Hit the preconditions per ADR-0004 (~300 X followers, 3-5 backlog pieces drafted, decline-of-West piece started). Launch September-October 2026."
  — September-October 2026 window superseded by June 30 (ADR-0014).
- Lines 18-20: Q2 milestone says "WardForge brain deployed ... customer outreach starts"; Q4 says "October 26 launch, post-launch consolidation, Substack live."
  — All superseded framing.
- Line 25: "**WardForge customer outreach — 25 conversations by end of June.**"
  — This is the top Q2 commitment (it also appears in `2026-Q2.md` below); killed by ADR-0014.

**`docs/goals/2026-Q2.md`**
- Lines 9, 25-27: "The customer-development quarter. WardForge moves from substrate-work to talking to humans" and "WardForge customer outreach — 25 conversations by end of June" as top-3 commitment.
  — Killed by ADR-0014.
- Line 8: "ADR-0018 drafted" mentioned in what's-already-shipped — this ADR number doesn't exist in this repo's decisions/; likely a carry-over from the WardForge company repo. Flag for cleanup.

### Compass-managed file (off-limits to reformat — flag for Troy awareness)

**`docs/weekly/2026-05.md`** line 68: "**WardForge — first 5 customer contacts**" as a weekly three. This is historical (week is past or in flight); Compass manages this file. No action needed, but worth noting the task is now obsolete per ADR-0014.

### Agent definition files (off-limits — flag for Troy)

- `.claude/agents/scribe.md` line 126: references `docs/projects/wardforge.md` in the "applies most strictly when updating" list. Should update to `docs/projects/ridingpulse.md`.
- `.claude/agents/librarian.md` line 25: uses `projects/wardforge.md` as the slug-verification example. Minor; not broken but stale.

### Scribe-touch items (in scope but out of this task)

**`docs/projects/substack.md`**
- Status line: "Public launch September-October 2026, contingent on preconditions below." Superseded by June 30 (ADR-0014).
- Line 9: "combining DCC practitioner experience, WardForge build context" — WardForge name.
- Lines 54-55: "Now → September 2026: build X following toward 300 ... September-October 2026: public launch" — superseded cadence.
- Preconditions section (~300 X followers, 3-5 backlog pieces before launch) — partially superseded by ADR-0014's publication-first framing.
- Entire file predates ADR-0014; needs a scribe pass to bring in sync.

**`docs/projects/dcc-qa-tool.md`**
- Line 47: "WardForge customer outreach commitment — the non-displaceable item per `decisions/0002-priority-ordering.md`" — references the now-killed customer outreach framing.
- The rest of `dcc-qa-tool.md` is clean: no content-domain specifics, no WardForge cross-talk beyond this one prose reference.

---

## Schema compliance

### `docs/goals/long-term/substack-2026.md`

**PASS.** All required universal fields present and valid:
- `id: substack-2026` matches filename.
- `type: creative` — valid.
- `status: active` — valid.
- `priority: 6` — matches ADR-0002 (writing = #6).
- `created_at`, `target_date` present and ISO 8601.
- `references` list present.
- `milestones` present with canonical `{ title, target, done }` shape.
- `schedule` present with valid day values.
- `sessions_log: []` present.
- No extra fields outside schema.

### `docs/goals/long-term/screenplay-may-21.md`

**PASS.** All required universal fields present and valid:
- `id: screenplay-may-21` matches filename.
- `type: creative` — valid.
- `status: active` — valid.
- `priority: 6` — matches ADR-0002.
- `created_at`, `target_date` present and ISO 8601.
- `references` list present.
- `milestones` present with canonical shape.
- `phases` present; `long_run` correctly omitted (non-running creative goal).
- `schedule` present with valid day values.
- `sessions_log: []` present.
- No extra fields outside schema.
- Note: The schema example for `screenplay-may-21` in `goal-frontmatter.md` still shows the old 13-day sprint shape (target 2026-05-21). The live file has the updated 23-day shape (target 2026-05-31). The schema example is illustrative, not normative — no fix required, but the schema's worked example is now stale. Low priority; flag for architect when the schema is next touched.

### ADR-0014 shape

**PASS.** ADR-0014 has all expected sections. No template.md exists (file not found when checked), so validated against the pattern described in `decisions/README.md`: Status, Date, Context, Decision, Consequences (positive/negative/neutral), Alternatives considered, Review dates, Related. All present. Well-formed.

---

## Sanitization check — `docs/projects/dcc-productivity.md`

**CLEAN.** The file contains no:
- Contract names or numbers.
- Content-domain names (no field of work named).
- Data types or data shapes.
- Integration architecture specifics (no vendor names, API names, endpoint shapes).
- Proprietary workflow names.
- Accuracy numbers or benchmarks.

The file reads at meta level throughout: "one core workflow shipped," "eval harness next," "routine DCC workflows," "time savings on repetitive professional work." The "Note on detail" section at line 59-62 explicitly states that specifics deliberately live outside personal-OS. Sanitization discipline is intact.

---

## Open follow-ups

1. **Scribe pass on `docs/projects/substack.md`** — bring in sync with ADR-0014. Update status line, cadence section, preconditions framing, and remove "WardForge build context" from the positioning paragraph.

2. **Scribe or Troy pass on `docs/projects/dcc-qa-tool.md`** — line 47 refers to the now-killed customer outreach commitment. One-line fix.

3. **Troy decision on `docs/identity.md`** — WardForge name, October 26 launch date, fall 2026 Substack framing all still present. Off-limits for agents; Troy or architect updates on next identity review.

4. **Troy decision on `docs/goals/2026.md` and `docs/goals/2026-Q2.md`** — WardForge / October 26 / 25-customer-conversations framing throughout. Off-limits; Troy or architect updates at next quarterly review or explicitly.

5. **Troy decision on ADR-0009 status** — ADR-0014 says it partially supersedes ADR-0009 on timing. Suggest adding "(partially superseded by 0014)" to ADR-0009's Status line and updating the index row. Troy decides; librarian will update the index row once Troy confirms.

6. **Troy decision on agent files** — `.claude/agents/scribe.md` line 126 and `.claude/agents/librarian.md` line 25 still reference `wardforge.md`. Off-limits during normal work; requires explicit instruction to update.

7. **Stale ADR number in `2026-Q2.md`** — line 19 references "ADR-0018" which doesn't exist in this repo. Likely carried over from WardForge company repo. Flag for cleanup when 2026-Q2.md is next touched.

---

## Refinement pass — 2026-05-12 (round 2)

### Scope

Covers what changed in the refinement round on top of the earlier librarian pass:
ADR-0014 rewritten with Aug 1 launch date, V1 scope, tech stack lock; `ridingpulse.md`
rewritten with same specifics; `substack-2026.md` fully replaced (priority 6 → 2, 11
milestones, `created_at` reset); `ridingpulse-v1.md` created (new goal file, 12 milestones);
`screenplay-may-21.md` milestones replaced + Open section updated; `dcc-productivity.md`
milestones checklist appended; `docs/calendar/2026-05.md` two new events added.

---

### 1. Schema validation

**`ridingpulse-v1.md` — PASS with one open question**

All required universal fields present and valid:
- `id: ridingpulse-v1` matches filename.
- `type: career` — valid per current enum. This is a type mismatch with the user's intent
  (`product` was specified); however `product` is not in the schema enum. The architect used
  `career` as the closest available value. This was the correct call given the schema as
  written. **Open question for Troy: extend the schema enum to add `product` as a type
  value? It maps to a meaningful and distinct category (external-facing tool builds) that
  `career` conflates with job/professional milestones. An ADR or schema edit would be the
  right path. Do not fix without Troy's decision.**
- `status: active`, `priority: 2`, `created_at: 2026-05-12`, `target_date: 2026-08-01` — all
  valid.
- `tags`, `references`, `milestones` (12 items, canonical `{ title, target, done }` shape),
  `sessions_log: []` — all present and valid.
- No extra fields outside schema.
- Note: `ridingpulse-v1.md` has no `schedule` block. Correct — the goal has no recurring
  day-of-week session structure; milestones are date-anchored build targets.

**`substack-2026.md` — PASS**

- `id: substack-2026` matches filename.
- `type: creative` — valid. Appropriate for a writing arc.
- `status: active`, `priority: 2` — valid. Priority change from 6 to 2 is not constrained
  by the schema (schema requires 1-9 integer, which 2 satisfies). ADR-0002's ordering uses
  6 for writing as a *default floor*, not a ceiling; the body of `substack-2026.md` explains
  the reasoning for the elevation (writing is now inside the priority-2 RidingPulse bucket).
  No schema or ADR violation.
- `created_at: 2026-05-12` — acceptable. The schema defines `created_at` as "when this file
  was authored." The file was fully replaced/reauthored on 2026-05-12; resetting `created_at`
  to that date is the honest description of when the current shape was written, not a schema
  violation. The prior shape's history is in git.
- `target_date: 2026-12-31`, `milestones` (11 items, canonical shape), `sessions_log: []`
  — all valid.
- `references` list present. All referenced files verified present: `ridingpulse.md`,
  `ridingpulse-v1.md`, `0014-ridingpulse-pivot.md`. (The body references `0009`, `0004`,
  `0002`, `ridingpulse.md`, `substack.md`, `identity.md` — also all present.)
- No `schedule` block. Correct — writing cadence is described in the body and milestones;
  Compass schedule blocks are for recurring day-of-week tasks. Biweekly piece cadence is not
  a fixed day-of-week repeater.
- No extra fields outside schema.

**`screenplay-may-21.md` — PASS**

- `id: screenplay-may-21` matches filename (deliberately preserved for cross-reference
  stability; target date is now 2026-05-31, explained in body).
- `type: creative`, `status: active`, `priority: 6` — valid.
- `target_date: 2026-05-31` — updated from 2026-05-21, matches the body narrative. Valid.
- `milestones` — replaced; 6 milestones, canonical shape. Valid.
- `phases` — replaced; 4 phases, no `long_run` (correct for creative). The Outline phase
  dates ("May 19 - May 20") are slightly inconsistent with the milestones ("Beat sheet
  complete: 2026-05-13"), suggesting the outline phase dates were not fully updated with
  the milestone recalibration. This is a **content concern for the architect/Troy to clarify**,
  not a schema violation. The frontmatter is well-formed.
- `schedule` block: expanded to 7 days (all days). Valid day values. No schema violation
  (schema permits multiple entries per day-of-week; each day listed once).
- `sessions_log: []`, `references` list (3 items, all verified present) — valid.
- No extra fields.

**Spot-check — other long-term goal files**

No changes made to `acl-return-to-sport.md`, `stop-smoking-2026.md`, `reading-2026.md`,
`toronto-half-2026.md` this round. Schema state is unchanged from the earlier pass (all
passed). No indirect breakage detected from this round's changes.

---

### 2. Cross-reference integrity

**`ridingpulse-v1.md` — RESOLVED correctly**

All five inbound references to `docs/goals/long-term/ridingpulse-v1.md` resolve:
- `docs/decisions/0014-ridingpulse-pivot.md` line 166 — present.
- `docs/projects/ridingpulse.md` lines 98, 131 — present.
- `docs/goals/long-term/substack-2026.md` lines 12, 128 — present.
- `docs/calendar/2026-05.md` (matthew-strategy-call event `related_goals: [ridingpulse-v1]`) — present.

**`substack-2026.md` — RESOLVED; references still valid**

File still exists at `docs/goals/long-term/substack-2026.md`. All inbound links resolve.
File's own references verified: `ridingpulse.md`, `ridingpulse-v1.md`, `0014`, `0009`,
`0004`, `0002`, `substack.md`, `identity.md` — all present.

**Stale WardForge references — no new instances in this round's changed files**

The earlier pass enumerated all stale WardForge/October 26/$4K/$9K/20-prospect
references. This round's grep confirms:
- `docs/decisions/0014-ridingpulse-pivot.md` — WardForge mentions are historical prose
  explaining the pivot. Correct as-is.
- `docs/projects/ridingpulse.md` — same; historical prose in the "Killed / superseded"
  section. Correct as-is.
- `docs/goals/long-term/substack-2026.md` — clean; no stale references.
- `docs/goals/long-term/ridingpulse-v1.md` — clean; no stale references.
- `docs/goals/long-term/screenplay-may-21.md` — clean.
- `docs/projects/dcc-productivity.md` — clean (WardForge mention absent; `dcc-qa-tool.md`
  line 47 stale reference flagged in round 1 is unchanged — still pending scribe fix).

No new stale instances surfaced from this round's file changes.

**ADR-0009 status annotation**

The earlier pass flagged this for Troy's decision. ADR-0014's Status block already contains
"Partially supersedes ADR-0009 on timing." The question is whether ADR-0009's own Status
line should also reflect this. Current ADR-0009 Status line: "Accepted — 2026-05-05" with
no mention of 0014. The decisions/README.md row for 0009 also has no "(partially superseded
by 0014)" annotation.

This annotation is mechanical — it mirrors what ADR-0014 already says — and does not
require a content rewrite of ADR-0009's body. **However**, editing an ADR body is outside
librarian write permissions. The index row in `decisions/README.md` is within scope.
Updating the index row now (without Troy's explicit confirmation) risks getting ahead of a
decision Troy hasn't made. Leaving it for Troy to confirm per the round-1 flag.

---

### 3. Sanitization — `dcc-productivity.md`

**CLEAN.** The four milestones appended by the architect:
- "Eval harness designed (test set + accuracy metrics)"
- "Eval harness running"
- "Initial accuracy baseline measured"
- "First round of improvements deployed against eval results"

These are meta-level only. No contract names, content-domain specifics, data types,
vendor names, API names, accuracy numbers, or workflow names. The file's explicit "Note
on detail" section (lines 59-62) reiterates that specifics live outside personal-OS.
Sanitization discipline is intact; no new exposure introduced.

---

### 4. Calendar format check — `docs/calendar/2026-05.md`

**PASS.** Both new events match the de facto shape of existing entries.

`matthew-strategy-call-2026-05-13`:
- `id`, `title`, `type: appointment`, `start`, `related_goals` (list), `notes` — all present.
- Shape matches `physio-reassessment` which also uses `type: appointment`, `start`,
  `related_goals`, `notes`.

`acl-lsi-baseline-2026-05-16`:
- `id`, `title`, `type: appointment`, `start`, `related_goals` — present.
- No `notes` field — omitted, which is valid (the earlier `eye-exam` event also omits `notes`).
- Shape is consistent with existing entries.

One observation: `matthew-strategy-call-2026-05-13` links `related_goals: [ridingpulse-v1]`.
The `ridingpulse-v1` goal file exists. Reference resolves.

No format violations.

---

### 5. Index maintenance

ADR-0014 is already in `docs/decisions/README.md` from the round-1 pass. No new ADRs this
round. Index is current: 0001–0014 contiguous, next available 0015.

---

### 6. Newly surfaced content drift

Nothing new beyond what round 1 enumerated. The only new potential drift is:

- **`screenplay-may-21.md` phase dates vs. milestones** (noted in schema section above):
  the Outline phase is dated "May 19 - May 20" in `phases[]`, but the "Beat sheet complete"
  milestone targets 2026-05-13. This is internally inconsistent. The milestones appear to
  reflect the actual plan; the phase dates may be stale from a prior version of the file.
  Flag for architect to reconcile on next touch.

---

### Suggested follow-ups for Troy

1. **Schema enum extension** — add `product` as a valid `type` value? RidingPulse v1 is
   filed under `career` as a workaround. The distinction is meaningful (external product
   build vs. job/professional milestone). Architect's call; likely warrants a schema-only
   update (not a full ADR unless the change affects Compass parsing).

2. **ADR-0009 status annotation** — add "(partially superseded by 0014)" to the
   `decisions/README.md` index row and optionally ADR-0009's Status block. Librarian will
   update the index row on Troy's confirmation; the ADR body edit requires Troy or architect.

3. **`screenplay-may-21.md` phase dates** — Outline phase shows "May 19 - May 20" but beat
   sheet milestone is 2026-05-13. Architect should reconcile.

4. **Open from round 1 still pending**: scribe pass on `substack.md`, one-line fix on
   `dcc-qa-tool.md` line 47, Troy decisions on `identity.md`/`2026.md`/`2026-Q2.md`,
   agent file `wardforge.md` references.
