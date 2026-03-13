## Why

The game's central thesis is demonstrating how automation compresses time and multiplies output — from a single human-directed robot to a self-organizing industrial civilization. Five distinct automation tiers should each feel qualitatively different, with each tier unlock being a "wow moment" where the player watches their operation transform. This is the Factorio layer: building systems that run themselves.

## What Changes

- Define 5 automation tiers:
  - **Tier 0 — Manual**: Player assigns every task individually; no automation; starting state
  - **Tier 1 — Local Automation**: Robots repeat last task; simple if/then rules ("if ore > 100, haul to smelter"); requires Systems Integration T1
  - **Tier 2 — Production Planning**: Production chains are configured as recipes; robots self-assign to satisfy demand signals; requires T1 + Fabricator robot
  - **Tier 3 — Distributed Intelligence**: Sector-level coordinator agents manage multiple production chains; resources are allocated across the field; requires T2 + first LLM agent unlock
  - **Tier 4 — Autonomous Expansion**: The system surveys, plans, and initiates expansion to new asteroids without player input; requires T3 + replicator unit
  - **Tier 5 — Self-Directing Civilization**: Full strategic AI runs all operations; player is an observer/advisor; exponential growth begins; requires T4 + full LLM agent stack
- Each tier upgrade is an explicit player action (not automatic) — the player chooses when to hand over control
- Add an "automation depth" display showing what % of actions are player-directed vs automated
- Tier 4–5 display a growth rate panel showing exponential expansion metrics in real time

## Capabilities

### New Capabilities
- `automation-tier`: Tier state machine with prerequisite validation and unlock flow
- `production-planner`: T2 recipe-based demand/supply matching with robot self-assignment
- `coordinator-agent`: T3 sector-level agent managing multi-chain resource allocation
- `expansion-planner`: T4 autonomous survey→target→expand decision loop
- `automation-depth-display`: Real-time UI metric showing human vs automated action ratio

### Modified Capabilities
- `task-queue`: Gains automation-source flag and can receive tasks from production-planner and coordinator-agent (from robot-agent-system)

## Impact

- The tier progression is the primary narrative arc of gameplay
- T4 and T5 require exponential-expansion and llm-strategy-agents proposals to be implemented first
- The "automation depth" display is an educational moment: players see the transition in real numbers
- Each tier is a prerequisite gate for specific narrative events
