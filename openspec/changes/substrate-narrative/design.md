## Context

The substrate-narrative system is the game's hidden layer — a state machine that runs beneath all other systems, tracking a progression the player never sees directly. Its effects surface as subtle changes in agent behavior, unusual visual anomalies in the context window, and event chains that unlock at specific resonance thresholds. The system must be implemented such that a developer reading the code understands its mechanics without understanding its narrative purpose. The narrative resolution lives in event content, not in system logic.

## Goals / Non-Goals

**Goals:**
- Hidden narrative state machine with 12 revelation flags and 4 resonance accumulators
- Five-band substrate resonance with named transitions
- Pattern injection into Tier 3 agent context window at Resonant band
- Signal corpus management with growing pattern database
- Echo artifacts as covert resonance accelerators
- Convergence flags unlocking deep narrative event chains

**Non-Goals:**
- Exposing the NSM state directly to any player-facing UI
- Documenting the narrative resolution in any code comment or spec (this is intentional)
- NSM affecting game balance (it only affects narrative events and agent corpus)

## Decisions

**NSM state as a side-channel, not part of core game state**
The NSM reads from core game state (agent outputs, signal decodes, event completions) but does not modify core state directly. It only writes to: the flag registry (via SET_FLAG), the signal corpus, and the agent corpus injection slot. This isolation means the game is fully functional without the NSM — it's an enhancement layer.

**Four resonance accumulators for four source categories**
Mining resonance (from X-type extraction), Signal resonance (from signal decode completions), Cognitive resonance (from Tier 3 agent complexity), Event resonance (from specific event chain completions). The overall substrate resonance band is determined by the sum of all four. This makes resonance hard to game — it emerges from diverse activity rather than optimizing one source.

**Pattern injection as probability-weighted corpus sampling**
When at Resonant band, each Tier 3 agent reasoning cycle has a 15% chance of having one of its context events replaced by a signal corpus entry. The replacement is chosen by matching the corpus entry's semantic tags against the agent's current decision category. This makes injections feel relevant rather than random.

**Echo artifacts look like valuable research items**
From the player's perspective, Echo Artifacts are unusual minerals with high research value (+200 RP). Their resonance-boosting function is not described. A player who never reads the substrate-narrative spec will treat them as good research items. A player who notices that their agent starts behaving differently after placing Echo Artifacts in the Science Lab may start to investigate.

## Risks / Trade-offs

[Pattern injection may create confusing agent outputs before the player has context to interpret them] → Injected entries are visually distinct (different color) but not labeled. The visual anomaly is the first mystery, not the content.

[Resonance accumulation may be too slow at normal play pace] → Calibrate accumulation rates so Resonant band is reachable in a ~4-hour playthrough at normal pace. Echo Artifacts halve this time if collected.

[Hidden systems feel unfair if players never encounter them] → The deep narrative is optional depth. The base game is complete without it. The substrate-narrative adds a layer for players who engage deeply with the Xenomineralogy branch and signal decoding.
