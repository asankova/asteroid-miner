## ADDED Requirements

### Requirement: RP from Scout Robots
Each active Scout robot assigned to a SURVEY task SHALL generate 2 RP/minute. RP is credited to the global RP accumulator each simulation tick.

#### Scenario: Scout RP generation
- **WHEN** 3 Scout robots are actively surveying
- **THEN** the global RP accumulator increases by 6 RP/minute

### Requirement: RP from Science Labs
Each active Science Lab structure SHALL generate 10 RP/minute when powered. Science Lab output scales with upgrade tier: Tier 2 = 20 RP/min, Tier 3 = 40 RP/min.

#### Scenario: Science Lab RP generation
- **WHEN** a Tier 2 Science Lab is powered and active
- **THEN** the global RP accumulator increases by 20 RP/minute

### Requirement: RP from Anomaly Discoveries
When a rare yield event produces a XENOMINERAL or ANOMALOUS_CRYSTAL mineral type, a one-time RP bonus of 500 RP SHALL be credited to the accumulator.

#### Scenario: Anomaly RP bonus
- **WHEN** a RARE_YIELD event with mineral_type=XENOMINERAL is emitted
- **THEN** 500 RP is immediately credited to the global accumulator
