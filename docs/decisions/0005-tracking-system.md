# 0005: Daily / Weekly / Habit / Goals tracking system

## Status

Accepted — 2026-05-03

## Context

The personal-OS substrate covers identity, projects, decisions, and people, but until now had no operational layer for what I'm doing today, what I'm trying to move this week, what habits I'm holding, and what I'm tracking over months and quarters. Calendar blocking has not worked for me — I don't follow it. I need a different shape.

After designing iteratively, the system has four layers across different time horizons, each with its own file structure. This ADR codifies the design so that a future revision is an explicit decision rather than an organic drift.

## Decision

The personal-OS gets four new substrate categories:

### 1. Daily layer — `docs/daily/YYYY-MM.md`

One file per month. Each day appended within. Structure per entry:

- **Morning intention** (1-2 sentences)
- **Tasks**: max 3 big tasks, plus an unbounded "Small" section for cleanup/errands
- **Habits**: binary checkboxes for the four tracked habits
- **Evening retrospective** (1-3 sentences)

Reading does NOT live here — it lives in its own log. This keeps the daily file scannable and the reading record clean.

### 2. Weekly layer — `docs/weekly/YYYY-MM.md`

One file per month. Each week appended within. Sunday review covers both the week-just-ended and setup for the week-coming, in a single sitting (~20-30 min).

Each weekly entry contains:

- **This week's three** (set Monday): three items, each with Why and Specific
- **Sunday review**: hit/partial/miss + blocker for each, plus habit summary, what I learned, drift signals, and notes for Matthew
- **Next week's three** (drafted Sunday)

Replaces the previous `docs/states/` directory.

### 3. Reading log — `docs/reading-log/YYYY-MM.md`

One file per month. Date-headered entries with book and page numbers. Substantial notes get promoted to `docs/notes/YYYY-MM-DD-bookname.md`.

The reading log accumulates over years into the most honest measure of the reading practice. Twelve files per year. Sixty by 2030.

### 4. Goals layer — `docs/goals/`

Two horizons:

- **Year file** (`YYYY.md`): three big bets, quarterly milestones, what I'm not doing this year, year-end review questions. Set January, reviewed mid-year, reflected on at year-end.
- **Quarter file** (`YYYY-Qn.md`): top 3 for the quarter, habit targets for the quarter, other moving items, quarter review questions. Drafted at quarter start, reviewed at quarter end.

### Tracked habits

Four habits, intentionally minimal:

- **Meditation** — daily, 10 min minimum (per ADR-0003).
- **Run** — 4x/week target.
- **Stretching** — 3x/week target.
- **No bad habit** — daily, kept general intentionally.

Writing is NOT a daily habit. It's a weekly milestone-based goal (outline, draft, revise). The habit list stays at four.

### Cadence

| When | What | Time |
|---|---|---|
| Morning | Open today's daily entry. Write intention + tasks. | 2 min |
| As habits happen | Tick boxes | 5 sec each |
| Reading session | Append to `reading-log/YYYY-MM.md` | 30 sec |
| Evening | Write retrospective | 2 min |
| Sunday morning | Weekly review (past + setup next) | 20-30 min |
| Quarter end | Quarter review + draft next quarter | 1 hour |
| Year end | Year review + draft next year | 2-3 hours |

Total daily ask: ~5 min. Sunday: ~30 min. Quarterly: 1 hour. Annually: a few hours.

## Consequences

### Positive
- A real operational layer that doesn't replicate calendar-blocking's failure mode.
- Daily friction is low (~5 min) so the system survives busy weeks.
- The reading log becomes a real artifact accumulating over years.
- Goals layer connects daily action to quarterly and annual horizons.
- Brain (when deployed) reads these files and produces synthesis, drift detection, habit aggregation. Substrate is canonical; brain is a surface on top.
- Habit tracking is minimal (4 habits, binary) — designed not to die.

### Negative
- Risk that daily entries become rote. Mitigated by keeping the asks short (intention + tasks + retrospective, no over-structured fields).
- Risk that weekly OKRs feel performative. Mitigated by the Why and Specific requirements — vague items are not allowed.
- Risk that the goals layer becomes aspirational rather than honest. Mitigated by mid-year and quarter-end reviews that name what didn't happen and why.
- Maintenance burden across four file categories is real. Mitigated by everything being plain markdown in a single repo.

### Neutral
- The system will be revised. ADRs are not sacred. If after a month the daily entry is too elaborate, simplify. If habits should expand to five, do so deliberately and update this ADR.
- The first weeks are the test. If the system survives May 2026 in a usable state, it is real.

## Alternatives considered

- **One file per day instead of per month.** Cleaner conceptually, but produces 365 files per year and complicates aggregation. Rolling-monthly wins.
- **A separate habit tracker file.** Rejected. The habit checks live inline in the daily entry. The brain (or manual scan) aggregates from there. Avoids the most common failure mode of habit trackers — maintaining the tracker becoming more work than the habits.
- **Calendar blocking.** Tried. Rejected. I don't follow it. The intention + retrospective shape is looser and survives.
- **Task list with strict prioritization (P1/P2/P3).** Rejected as too rigid for personal use. Three big tasks + small list is enough structure.
- **Friday review + Sunday setup as separate sittings.** Considered. Consolidated to Sunday-only per personal preference.
- **Weekly writing as a daily habit.** Considered, rejected. Writing happens in milestones (outline, draft, revise), not in binary daily checkboxes. Lives in weekly goals instead.

## Review

This ADR gets revisited at:
- **End of May 2026**: did the system survive its first month? Are the daily entries getting filled? Is the Sunday review happening?
- **End of Q2 (June 30)**: substantive review. Anything that's not working gets adjusted.
- **End of 2026**: year-end review, with explicit re-evaluation of the whole system.

## Related

- `docs/decisions/0001-personal-os-exists.md` — the meta-decision
- `docs/decisions/0002-priority-ordering.md` — what's being tracked, in what order
- `docs/decisions/0003-contemplative-floor.md` — meditation as a tracked habit
- `docs/decisions/0004-substack-launch-preconditions.md` — Substack as quarterly goal
- `docs/projects/habits.md` — operational notes on the habit system
- `docs/routines.md` — daily/weekly cadence reference
