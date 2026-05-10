---
id: substack-2026
title: First external publication, Substack opens around it
type: creative
status: active
priority: 6
created_at: 2026-05-09
target_date: 2026-11-30
references:
  - docs/decisions/0002-priority-ordering.md
  - docs/decisions/0004-substack-launch-preconditions.md
  - docs/projects/substack.md
  - docs/identity.md

milestones:
  - { title: "Decline-of-West outline drafted",                      target: 2026-05-31, done: false }
  - { title: "Decline-of-West section 1 in prose",                   target: 2026-06-30, done: false }
  - { title: "Backlog: 3 pieces drafted (any state)",                target: 2026-08-31, done: false }
  - { title: "X following at ~300 (real, not paid)",                 target: 2026-09-15, done: false }
  - { title: "First publishable piece complete (Comment-quality)",   target: 2026-10-15, done: false }
  - { title: "First piece published in external venue",              target: 2026-11-30, done: false }
  - { title: "Substack launches around the publication",             target: 2026-11-30, done: false }

schedule:
  - { day: sat, title: "Writing block (primary)" }
  - { day: sun, title: "Writing block (secondary, as needed)" }

sessions_log: []
---

# First external publication, Substack opens around it

## Why this matters

Writing is priority 6 per ADR-0002 — below WardForge, family, reading, and
health, but above DCC. The lower number doesn't mean less important; it
means less weekly time. This is a long-arc commitment from the identity
file: Canada's foremost voice on infrastructure delivery and political
modernization is a decade-plus build, and the first published piece is
the gate it passes through.

ADR-0004 already locks the launch preconditions: ~300 X followers, 3-5
backlog pieces, and the decline-of-the-West essay started in some form.
This goal file is what those preconditions look like as dated milestones,
plus the additional commitment that the Substack opens *around* a real
external publication rather than as a standalone debut. Launching with a
*Comment Magazine* (or comparable) piece in hand changes the first
impression from "another newsletter" to "person whose first published
work is here too."

## Approach

Saturday is the primary writing block; Sunday afternoon is the overflow
slot. Two tweets per day on writing days, deliberately interesting rather
than constant — the X following is a side effect of writing publicly with
substance, not a separate growth project.

The decline-of-the-West piece is the keel. Outline first (May), section 1
in prose (June), then it informs everything else in the backlog. Per the
Substack project file: the discipline is starting badly, not waiting for
the thesis to be sharp.

External publication is the launch trigger. If a *Comment* (or peer
publication) acceptance lands by mid-November, the Substack opens around
it. If not, ADR-0004's review gate at end of August / end of October
governs whether to push the launch into 2027 — launching to no audience
with thin material is worse than launching late.

## Watch-for signals

- Saturday writing block missed two weeks running without an explicit
  reason. The whole goal runs through that one block; losing it is
  losing the goal.
- "Drafting" without finishing anything for six weeks. Drafting forever
  is a known failure mode of writers like me — at some point, a piece
  has to be true and well-said and shipped, even if not perfect.
- X following stuck or declining despite tweeting. The threshold isn't
  the number, it's the engagement; if neither is moving, the writing
  isn't landing and the diagnosis is upstream.
- Decline-of-West piece still unstarted at end of June. Per the Substack
  project file, this is the moment to either commit harder or release
  the idea. Don't drag it.
- Spending writing time on substrate / Compass / ADRs instead of prose.
  The substrate-as-avoidance pattern from CLAUDE.md applies directly here.

## Open

- Which external publication actually goes first. *Comment* is named in
  identity.md but not committed to as the only target. Decide once the
  first piece has a shape.
- Whether the Substack launch piece is the first external piece itself
  (republished) or a companion piece. Probably the latter, but the
  decision is downstream of having the first piece.
- Cadence after launch. Project file says biweekly; revisit after the
  first month of public posting with real data on what's sustainable
  alongside WardForge phase 2.

## Related

- `docs/decisions/0004-substack-launch-preconditions.md` — the binding preconditions
- `docs/decisions/0002-priority-ordering.md` — writing at #6
- `docs/projects/substack.md` — full project context, themes, reading anchor
- `docs/identity.md` — the long-arc commitment this serves
