## Why

The climax of the game is watching exponential growth unfold. Once self-replicating units are deployed and the Tier 5 agent takes over, the player's operation should visibly explode in scale — doubling, quadrupling, filling the field. This needs to be explicitly demonstrated with growth rate charts, and the game must gracefully handle the performance implications of exponential entity count growth. This is also the moment the game asks: what happens when growth has no ceiling?

## What Changes

- Implement **Replicator Unit**: a special Tier 4 robot that can fabricate copies of basic robots using local resources; requires Memory Crystal (advanced component from rare earths) + sufficient raw materials; fabrication takes 3 real-time minutes per unit
- Add **Exponential Growth Dashboard**: a live panel showing entity count over time on a log scale, doubling time calculator, resource consumption rate, and projected field saturation ETA
- Implement **carrying capacity** mechanics: the asteroid field has a maximum extractable resource ceiling; as the operation approaches saturation, marginal yield per robot falls; the dashboard shows this curve
- Add **frontier expansion**: when the local cluster is saturated, Tier 5 agents propose launching inter-belt expansion probes to adjacent clusters; this requires Launch Rails and high advanced-component reserves
- Implement **cascade events**: random events that knock back growth (equipment cascade failures, power grid overloads, coordination storms where too many agents conflict); these are not punishment but pacing devices
- Add growth replay: the player can view a time-lapse of their entire operation's growth history

## Capabilities

### New Capabilities
- `replicator-unit`: Special robot with self-fabrication loop consuming local resources
- `growth-dashboard`: Live log-scale chart of entity count, doubling time, and saturation projection
- `carrying-capacity`: Field resource ceiling with marginal-yield decay as saturation approaches
- `frontier-expansion`: Inter-cluster expansion probe system triggered by Tier 5 agent
- `cascade-event`: Pacing events that temporarily reduce growth rate without permanently punishing player

### Modified Capabilities
- `robot-entity`: Gains replicable flag and fabrication recipe (from robot-agent-system)
- `expansion-planner`: Gains frontier expansion targeting (from automation-tiers)

## Impact

- Replicator units must be carefully balanced so early deployment doesn't trivialize resource management
- The growth dashboard is an explicit educational display — players should feel the difference between linear and exponential
- Frontier expansion creates the possibility of infinite play — the game doesn't end, it scales
- Cascade events must be tuned to feel meaningful but not frustrating during the exponential phase
