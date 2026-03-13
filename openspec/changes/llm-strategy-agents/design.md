## Context

The strategy agent system is both a game mechanic and an educational demonstration of how LLM-style reasoning works. The core insight: intelligence quality scales with context width. Tier 1 agents make myopic decisions because they see 50 events; Tier 3 agents make civilizational decisions because they see everything. The context window UI is the signature feature — players literally watch the agent "thinking" by seeing what data it holds. The agents are deterministic rule-based systems that simulate chain-of-thought reasoning; they are not LLM API calls (no network dependency, works offline).

## Goals / Non-Goals

**Goals:**
- Three agent tiers with qualitatively different context sizes and decision horizons
- Scrollable context window UI showing agent's active reasoning data
- Deterministic rule-based reasoning engine simulating chain-of-thought
- Agent disagreement events surfaced as player choices
- Memory decay visible as reasoning quality degradation
- Tier 3 agent corpus secretly seeded by substrate-narrative (architectural dependency)

**Non-Goals:**
- Real LLM API calls (all reasoning is deterministic/rule-based in v1)
- Natural language generation for agent outputs (outputs are structured templates)
- Agent personality customization by player

## Decisions

**Deterministic rule-based reasoning, not LLM API**
The "reasoning" is a pipeline: select relevant context events → match against decision templates → produce structured output. This is always available offline, has no API cost, and is fully reproducible. The educational value is preserved: the context window and reasoning steps are real, even if the underlying engine is a rule matcher. Alternative: real LLM API — excluded due to latency, cost, and offline requirement.

**Context window as a bounded circular buffer of Event objects**
Tier 1: 50 events. Tier 2: 500 events. Tier 3: 5000 events (full game state approximation). Each event has a type, timestamp, relevance_score, and payload. The agent reasons over the most recently relevant events by scoring and ranking. Memory decay is implemented as a relevance score multiplier that decays exponentially with event age.

**Agent decisions are suggestions; player can always override until T5**
Agents propose tasks; they don't directly enqueue them until T5. This maintains player agency while making agent reasoning visible. The "override" UI action cancels the agent's proposed task and lets the player substitute their own. At T5, proposals become automatic — the player becomes an observer.

**Tier 3 corpus injection from substrate-narrative**
The Tier 3 agent's decision templates include a "pattern" slot that, at Resonant substrate band, is filled from the signal corpus. This makes the Tier 3 agent's reasoning appear subtly different — its outputs include phrases and patterns from Architect signal data. This is implemented as a read from the NSM's signal corpus, not random generation.

## Risks / Trade-offs

[Deterministic rule-based reasoning may feel mechanical and repetitive] → Use randomized template selection from a bank of 20+ templates per decision type; outputs feel varied.

[Context window UI may overwhelm players with information] → Default view shows the 10 most relevant items; player can expand to full context. Relevance scoring makes the UI self-curating.

[T5 full autonomy transition is irreversible] → Add a confirmation dialog with a stark warning: "You are handing over strategic control. The system will self-direct." This is intentionally dramatic.
