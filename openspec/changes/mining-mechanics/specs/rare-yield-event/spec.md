## ADDED Requirements

### Requirement: Bernoulli Rare Yield Roll
On each completed mining task, the system SHALL perform a Bernoulli trial with probability p = base_rate × tool_rare_modifier × asteroid_type_modifier. If successful, a RARE_YIELD event is emitted alongside the standard yield.

#### Scenario: Precision laser on X-type probability
- **WHEN** Precision Laser completes a mining task on an X-type asteroid
- **THEN** the rare yield probability is 0.05 (5%), the highest possible rate

### Requirement: Rare Yield Triggers Research and Narrative
A RARE_YIELD event SHALL carry a mineral_type field. Specific mineral types SHALL trigger discovery-unlock events in the tech-tree-research system and/or narrative-trigger events in the ancient-race-discovery system.

#### Scenario: Xenomineral discovery
- **WHEN** a RARE_YIELD event with mineral_type=XENOMINERAL is emitted
- **THEN** the tech-tree-research system receives a XENOMINERALOGY_UNLOCK_TRIGGER event
