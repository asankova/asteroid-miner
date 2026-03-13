## Why

The ancient race — let's call them the Architects — are first hinted at very early but are never confronted until the player has invested deeply in automation. The design principle is Stanislaw Lem's approach: what is alien should be *genuinely* incomprehensible at first, then slowly resolvable, and the resolution should be more unsettling than the mystery. The Architects' behaviour should feel wrong before it feels threatening.

## What Changes

- Implement **Dormancy State**: Architects exist in a dormant state throughout the early game; their presence is registered only as data anomalies — unusual mineral formations, faint repeating signals, geometry in ore distributions that shouldn't be natural
- Define **disturbance threshold**: each time an X-type asteroid is mined above 40% extraction, a dormancy counter increments; the Architects' awakening is a collective, gradual process — not a switch
- Add **5-stage awakening sequence**:
  - Stage 0 (0–10% threshold): Anomalous signals in signal detector; resemble noise
  - Stage 1 (10–30%): Signal patterns become recursive; Xenomineralogy research enables partial decode
  - Stage 2 (30–50%): Dormant Architect constructs become visible on high-powered scans — massive, geometric, cold
  - Stage 3 (50–75%): Architects begin low-level interference: robots in nearby sectors occasionally freeze, signals jam, rare equipment malfunctions
  - Stage 4 (75–100%): Active Architect entities appear; they do not attack immediately — they observe; their movement is slow, deliberate, and wrong
- Architect entities do not use standard pathfinding; their behavior is governed by a separate non-behavior-tree system that feels alien and unpredictable
- Add **threat level** as a player-visible metric; threat is not health but a state measure of how disturbed the Architects are; it only increases, never decreases naturally
- The Architects are not destroyed — they can be contained, avoided, or communicated with (the latter requires full Xenomineralogy + Tier 3 agent)

## Capabilities

### New Capabilities
- `dormancy-counter`: Global accumulator tracking total Architect disturbance level across all X-type mining
- `signal-detector`: Structure that captures and displays anomalous signals; upgradeable decode fidelity
- `awakening-sequence`: State machine managing the 5-stage Architect emergence with event triggers
- `architect-entity`: Architect unit with alien movement logic, interference effects, and observation behavior
- `threat-level`: Global threat metric visible to player, feeding into event system and agent reasoning

### Modified Capabilities
- `asteroid-generator`: X-type asteroids gain dormancy-link flag tying extraction to dormancy-counter (from asteroid-field-generation)
- `rare-yield-event`: Anomalous mineral drops from X-type asteroids now feed Xenomineralogy unlock (from mining-mechanics)
