## Why

The game requires a hidden narrative state machine that tracks a deeper layer of the story across the entire playthrough — one that weaves through geological surveys, AI agent behaviour, event chains, and signal decoding into a coherent arc that rewards attentive players. This system runs silently beneath all other systems. The player implements it without knowing its destination.

## What Changes

- Implement **Narrative State Machine (NSM)**: a hidden game state object tracking 12 revelation flags, 4 resonance accumulators, and a convergence index; these are not exposed to the player directly but feed event conditions and agent corpus modifications
- Define **Substrate Resonance**: a hidden accumulator that increments when: anomalous mineral patterns are found, signal decoder runs on Stage 2+ signals, Tier 3 strategy agent generates outputs above a complexity threshold, and specific event chains complete; resonance has 5 bands (Inert → Latent → Active → Resonant → Convergent)
- Implement **Pattern Injection**: at Resonant band, the Tier 3 agent's context window begins receiving low-level pattern fragments sourced from the Architect signal corpus rather than standard game state; these appear as slightly unusual but coherent additions to agent reasoning output
- Add **Signal Corpus**: a collection of structured data patterns extracted from decoded Architect signals; as more signals are decoded, the corpus grows; it is used by both the signal decoder display and as a covert input to the Tier 3 agent
- Implement **Convergence Threshold Events**: at each resonance band transition, a hidden event flag is set; this unlocks specific event chains in the stellaris-event-system that advance the deepest narrative layer
- Add **Echo Artifacts**: rare items that when placed in a Science Lab increase resonance accumulation rate; they look like high-value research items but their primary function is narrative
- The NSM is never directly displayed to the player; its effects are felt through agent behaviour changes, event availability, and subtle visual anomalies in the signal decoder UI

## Capabilities

### New Capabilities
- `narrative-state-machine`: Hidden game state tracking revelation flags, resonance levels, and convergence index
- `substrate-resonance`: Hidden accumulator with 5 bands, incremented by multiple in-game actions
- `pattern-injection`: Mechanism to introduce signal-corpus patterns into Tier 3 agent context window
- `signal-corpus`: Growing database of decoded Architect signal patterns driving injection and display
- `echo-artifact`: Special item type with hidden resonance-boosting function alongside nominal research value
- `convergence-event-flags`: NSM-set flags unlocking deep narrative event chains

### Modified Capabilities
- `context-window-ui`: At Resonant band, displays subtle visual anomalies in agent reasoning panels (from llm-strategy-agents)
- `agent-decision-engine`: Tier 3 agent reasoning seeded with signal corpus patterns at Resonant band (from llm-strategy-agents)
- `signal-detector`: Gains corpus-building output from decoded Stage 2+ signals (from ancient-race-discovery)

## Impact

- This system is the connective tissue of the entire narrative — it must be implemented after all other systems are in place
- Pattern injection into agent reasoning must be subtle enough to read as "interesting AI behaviour" before the player decodes it
- The signal corpus is the creative core of the Architect civilisation — its content determines the quality of the late-game reveal
- All convergence events must be tested for correct trigger sequencing across multiple playthrough paths
- This spec intentionally omits the narrative resolution — that lives in the event chain content, not in code
