## Context

The tech tree gates all mid-to-late game content. It must be authored as data (not code) so balance iteration doesn't require recompilation. The tree is a DAG of 60+ nodes across 5 branches. Research Points (RP) are the primary currency. The Xenomineralogy branch is a deliberate late gate: it requires rare mineral discoveries and is the only path to decoding Architect signals. Discovery unlocks (triggered by in-game events rather than RP) are the primary bridge between narrative and progression.

## Goals / Non-Goals

**Goals:**
- 60+ nodes in a DAG with prerequisite enforcement
- 5 research branches with visual clustering
- RP-based queue with background accumulation
- Discovery unlock mechanism for event/anomaly-triggered nodes
- Rushed research mode with partial failure risk

**Non-Goals:**
- Multiplayer research sharing
- Research trading or gifting
- Procedurally generated tech tree (tree is hand-authored in data)

## Decisions

**Tech tree as static JSON/YAML data file**
All node definitions — prerequisites, costs, rewards — are in a single data file loaded at startup. This makes balance changes a data edit, not a code change. The engine just evaluates the DAG. Alternative: code-defined nodes — rejected because it conflates data and logic.

**RP as a single global accumulator, not per-branch**
Players allocate RP to one active research item at a time. RP is a unified currency. Branch specialization is expressed through unlock prerequisites, not separate currencies. Alternative: per-branch RP — creates analysis paralysis with 5 separate meters to manage.

**Discovery unlocks as flag checks, not separate mechanics**
A discovery unlock node has a trigger_flag field. When the event system sets that flag, the node becomes unlockable (still costs RP, but prereq is now met). Flags are set by: rare yield events, event chain consequences, and survey completions. Simple, composable, no special-casing.

**Reward payload as a typed union**
Research rewards are: NEW_ROBOT_TYPE, NEW_TOOL, NEW_STRUCTURE, EFFICIENCY_BONUS, AUTOMATION_TIER_UNLOCK, NARRATIVE_TRIGGER. Each is a distinct payload type processed by the appropriate subsystem when the node completes.

## Risks / Trade-offs

[60+ nodes is a lot to hand-author and balance] → Use a spreadsheet-first authoring workflow; generate YAML from spreadsheet. Designed for iteration.

[Discovery unlocks gated by rare events may feel unfair] → Ensure Xenomineralogy T1 is triggerable by any X-type mining, not just rare drops. Rate is low but not punishing.

[Rushed research failure modes need to be interesting, not annoying] → Partial failure = one random downstream structure malfunctions for 2 minutes. Visible, fixable, low stakes.
