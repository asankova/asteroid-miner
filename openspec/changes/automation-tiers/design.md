## Context

Automation tiers are the primary progression arc. Each tier should feel qualitatively different: at T0 the player is a micromanager; at T5 they are an observer watching exponential growth unfold. Each tier hands more agency to the system. The transition moments — when the player upgrades to T2, T3, etc. — should be memorable "wow moments." The system must support gradual handover: automation generates tasks that the player can see and override, not a black box that takes over silently.

## Goals / Non-Goals

**Goals:**
- Six distinct automation tiers with qualitatively different gameplay feel
- Explicit player-controlled tier upgrade (not automatic)
- Automation actions are visible and overridable at all tiers except T5
- Automation depth display showing human vs automated action ratio
- Each tier properly gates its prerequisites

**Non-Goals:**
- Downgrading automation tiers (once a tier is activated, it persists)
- Per-robot automation level (tier applies globally)
- Automation affecting the narrative/event system directly (mediated by strategy agents)

## Decisions

**Tiers as a global game state enum, not per-system settings**
One global automation tier affects all systems simultaneously. The player cannot have T3 mining with T1 logistics. This simplifies the state space and makes each tier upgrade feel like a civilization milestone. Alternative: per-domain automation levels — creates UI complexity and dilutes the "wow moment."

**T1 rules as a simple if/then data-driven rule file**
T1 automation is "if condition, then enqueue task" rules. Rules are authored as data, evaluated each tick. Example: `{condition: "ore > 100", action: "enqueue HAUL to smelter"}`. The player can view, add, and remove rules. Alternative: visual programming — out of scope for v1.

**T2 production planner as demand-driven pull system**
The planner works backward from desired output (e.g., "produce 10 circuit_boards/min") through the recipe graph to compute required input rates and robot assignments. This is the same approach as Factorio's blueprint system in spirit, without the visual belt layout.

**T3 coordinator agent as sector-scoped demand aggregator**
The coordinator takes production planner outputs from multiple sectors and reconciles resource allocation conflicts. It is implemented as a deterministic rule-based system, not an LLM — the LLM integration happens at T3/T4/T5 automation but is provided by the llm-strategy-agents proposal.

## Risks / Trade-offs

[T1 rule engine evaluated each tick for 200+ robots may be slow] → Rules are simple comparisons on pre-computed aggregates; total cost <0.5ms per tick.

[T2 planner may create suboptimal assignments that frustrate players] → Planner shows its reasoning; player can override any assignment; planner is a suggestion engine, not a mandate.

[T5 full autonomy may feel like the game "plays itself"] → T5 is the endgame thesis moment — exponential growth is the spectacle. Player interaction shifts from micromanagement to observation and steering.
