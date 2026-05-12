# Personal OS

Troy's personal substrate. Markdown files only. The single canonical source for what I'm working on, what I've decided, what I'm tracking, and how I'm living.

Eventually a brain will sit on top of this repo and answer queries against it. For now, just the substrate.

## What goes here vs. what doesn't

**Goes here:** values, long-arc commitments, current projects, decisions, weekly states, reading notes, important relationships, inbox capture.

**Does not go here:**
- RidingPulse operational substrate — that lives in the company repo. A summary file lives at `docs/projects/ridingpulse.md` for personal context only.
- DCC work — kept walled off entirely, for COI reasons.
- Anything sensitive about other people that they wouldn't want recorded.
- Credentials, financial details, anything that should be in 1Password.

## Layout

```
docs/
├── identity.md              # who I am, values, long-arc commitments
├── routines.md              # current weekly cadence
├── reading.md               # what I'm reading, finished, on deck
├── people.md                # important relationships, current state
├── inbox.md                 # capture-first dump, processed weekly
├── projects/                # one file per active project
├── decisions/               # ADRs for personal decisions
├── goals/                   # year and quarter goals
├── daily/                   # daily entries (one file per month)
├── weekly/                  # weekly OKR + retrospective
├── reading-log/             # daily reading log with page numbers
└── notes/                   # free-form dated thinking
```

## How it works

**Daily:**
- Open today's entry in `docs/daily/YYYY-MM.md` (Compass dashboard surfaces this) — intention, tasks, habits, optional retrospective.
- Capture loose items into `docs/inbox.md`. No filtering, no formatting, just dump.

**Weekly (Sunday morning, ~20-30 min):**
- Sunday review in `docs/weekly/YYYY-MM.md`: hit/partial/miss for the week's three, habit summary, draft next week's three.
- Process inbox: trash / do now / file to project / promote to decision.
- Read the synthesis if the brain is generating one.
- Update project files with what moved this week.

**Monthly (~30 min):**
- Re-read decisions from the past month. Are they still standing?
- Re-read identity.md. Did I live it this month?

**Quarterly (~1 hour):**
- Substantial review of identity, routines, and project list.
- Archive completed or abandoned projects.
- Refresh the long-arc commitments if they've shifted.
- Quarter review + draft next quarter in `docs/goals/YYYY-Qn.md`.

**Annually (a few hours):**
- Year review + set three big bets for next year in `docs/goals/YYYY.md`.

## Discipline

The substrate is only as good as it's kept. The minimum bar:
- Every meaningful decision becomes a one-paragraph ADR within 24 hours.
- Inbox gets processed every Sunday.
- Project files get a one-line update at minimum every Sunday for active projects.

If the substrate goes stale for 2+ weeks, that's a signal worth surfacing. Either I don't actually need this, or something else is wrong.
