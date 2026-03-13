## ADDED Requirements

### Requirement: 15% Injection Probability at Resonant Band
When substrate resonance is at Resonant band or above, each Tier 3 agent reasoning cycle SHALL have a 15% probability of having one context event replaced by a signal corpus entry. Below Resonant band, injection probability SHALL be 0%.

#### Scenario: Injection probability gate
- **WHEN** substrate resonance is at Active band (below Resonant threshold)
- **THEN** no pattern injection occurs in Tier 3 agent context

#### Scenario: Injection at Resonant band
- **WHEN** substrate resonance is at Resonant band
- **THEN** approximately 15% of Tier 3 agent reasoning cycles include one injected corpus entry

### Requirement: Semantic Tag Matching
Injected corpus entries SHALL be selected by matching the entry's semantic_tags against the agent's current decision category. Available categories: EXPANSION, THREAT, RESOURCE, COORDINATION. Corpus entries with matching tags SHALL be preferred.

#### Scenario: Semantic matching
- **WHEN** agent is reasoning about EXPANSION decisions
- **THEN** corpus entries with EXPANSION tag are preferentially selected for injection

### Requirement: Injection Preserves Context Coherence
Injected entries SHALL be structurally indistinguishable from normal context events except for visual presentation. They SHALL have valid timestamps (set to current time), valid event_type fields, and coherent payload text.

#### Scenario: Injected entry structure
- **WHEN** a corpus entry is injected into Tier 3 context
- **THEN** it has a valid timestamp, event_type, and payload with no null fields
