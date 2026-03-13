## Why

One of the game's explicit goals is to demonstrate how large language models work as a gameplay mechanic — not as a gimmick but as a meaningful simulation of how high-level intelligence emerges from context. The strategy agent system models three tiers of AI decision-making, each with a visible "context window" that shows what information the agent is reasoning over. Players watch agents reason, fail, adapt, and improve as their context grows — an interactive demonstration of LLM principles.

## What Changes

- Define 3 strategy agent tiers:
  - **Tier 1 — Tactical Agent** ("Scout Mind"): context window of 50 recent events; makes short-horizon decisions (which asteroid to mine next, where to route a hauler); reasoning is displayed as short plain-text summaries; unlocked at Automation Tier 3
  - **Tier 2 — Operational Agent** ("Field Director"): context window of 500 events + current production chain state; manages multiple sectors; reasoning shown as structured plans with rationale; unlocked at Automation Tier 4
  - **Tier 3 — Strategic Agent** ("The Architect"): context window of full game state; makes civilization-level decisions (expansion targets, tech priorities, threat response); reasoning shown as long-form strategic assessments; unlocked at Automation Tier 5
- Implement the **Context Window UI**: a scrollable panel showing exactly what data the active agent is reasoning over — events, resource states, threat indicators — with the agent's conclusion highlighted; makes the "black box" of AI visible
- Agents can be overridden by the player at any time; agent decisions are suggestions until T5 when they become autonomous
- Add **agent disagreement events**: when agents at different tiers reach conflicting conclusions, the conflict is surfaced as a choice for the player
- Implement agent **memory decay**: old events drop out of the context window over time; agents make worse decisions when context is stale — visible to the player as reasoning quality indicators
- The Tier 3 agent's language patterns are seeded from an internal corpus — this corpus evolves as the game progresses (narrative hook, not revealed here)

## Capabilities

### New Capabilities
- `strategy-agent`: Agent entity with tier, context-window buffer, reasoning engine, and decision output
- `context-window-ui`: Live scrollable panel showing agent's active context and current reasoning
- `agent-decision-engine`: Deterministic rule-based reasoning system that mimics LLM chain-of-thought
- `agent-disagreement`: Conflict detection between tiers surfaced as player-facing choice events
- `memory-decay`: Context window aging mechanism with visible quality degradation display

### Modified Capabilities
- `compute-budget`: Tier 2 agents consume 10 CP/s, Tier 3 agents consume 50 CP/s (from simulation-performance)
- `automation-tier`: Gains agent unlock gates at T3/T4/T5 (from automation-tiers)

## Impact

- The context window UI is the educational centrepiece of the game — must be visually legible and compelling
- Agent reasoning quality is directly tied to Compute Budget allocation — creates a feedback loop between infrastructure investment and AI quality
- The Tier 3 agent's corpus seeding has a hidden dependency on substrate-narrative — its language patterns are not random
- Agent decisions drive Automation Tier 4–5 expansion; without functioning agents, late-game automation stalls
