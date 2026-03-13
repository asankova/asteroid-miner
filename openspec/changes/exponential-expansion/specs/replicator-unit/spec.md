## ADDED Requirements

### Requirement: Self-Fabrication Loop
The Replicator Unit SHALL be a specialized robot type that can fabricate one additional Replicator Unit from local resources. Fabrication requires: 5 memory_crystal + 10 circuit_board + 20 iron_bar available in local storage. Fabrication takes 180 seconds real-time.

#### Scenario: Replicator fabrication start
- **WHEN** a Replicator Unit has sufficient local resources (5 memory_crystal, 10 circuit_board, 20 iron_bar)
- **THEN** it initiates a fabrication cycle that completes after 180 seconds

### Requirement: Resource Consumption on Fabrication
Materials consumed during fabrication SHALL be deducted from the nearest Storage Depot at fabrication start. If materials become insufficient mid-fabrication, fabrication pauses until materials are restored.

#### Scenario: Material shortage mid-fabrication
- **WHEN** a Storage Depot is depleted of circuit_boards while a Replicator is fabricating
- **THEN** fabrication pauses and resumes automatically when circuit_boards are restocked

### Requirement: Fabrication Requires Memory Crystal
Memory Crystals are the Tier 3 advanced component derived from rare-earth concentrate. They are rare and represent the strategic bottleneck on replication speed. The Memory Crystal recipe SHALL require rare_earth_concentrate as its sole Tier 2 input.

#### Scenario: Memory Crystal as bottleneck
- **WHEN** rare_earth_concentrate production is insufficient
- **THEN** Memory Crystal stock depletes and Replicator fabrication pauses, throttling growth rate
