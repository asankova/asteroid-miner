## ADDED Requirements

### Requirement: Seven Consequence Types
The consequence engine SHALL support seven consequence types: SET_FLAG (sets a boolean flag), ADD_RESOURCE (adds material to storage), ADD_RP (adds research points), UNLOCK_RESEARCH (unlocks a research node), MODIFY_THREAT (increments threat level), INJECT_CORPUS (adds a pattern to signal corpus), CHAIN_ADVANCE (advances an event chain to specified step).

#### Scenario: SET_FLAG consequence
- **WHEN** a choice with SET_FLAG consequence is selected
- **THEN** the specified flag is set to true in the global flag registry

### Requirement: Consequence Processing Order
All consequences from a chosen option SHALL be processed in the order listed in the event definition. Processing is synchronous and completes before the event card closes.

#### Scenario: Multi-consequence processing
- **WHEN** a choice has [ADD_RP: 500, SET_FLAG: "SIGNAL_DECODED", CHAIN_ADVANCE: chain "C1" step 2]
- **THEN** all three consequences are applied in that order before the card dismisses
