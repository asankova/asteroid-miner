## ADDED Requirements

### Requirement: Node Data Model
Each research node SHALL have: id (string), branch (enum), display_name, description, rp_cost (integer), prerequisites (array of node ids), reward (typed union), unlock_type (RP_SPEND or DISCOVERY), and trigger_flag (string, only for DISCOVERY type).

#### Scenario: Node prerequisite validation
- **WHEN** player attempts to queue a node whose prerequisites are not completed
- **THEN** the queue rejects the addition with PREREQUISITES_NOT_MET error

### Requirement: Rushed Research Mode
Any node SHALL support a "rushed" mode: RP cost is reduced by 50% but on completion there is a 20% chance of partial failure. Partial failure applies a random malfunction to one active structure for 120 seconds.

#### Scenario: Rushed research failure
- **WHEN** rushed research completes and the failure roll succeeds (20% chance)
- **THEN** one randomly selected active structure enters MALFUNCTION state for 120 seconds
