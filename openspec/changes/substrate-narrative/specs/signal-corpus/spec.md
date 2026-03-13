## ADDED Requirements

### Requirement: Growing Pattern Database
The signal corpus SHALL be a list of pattern entries, each with: pattern_id, semantic_tags (array of EXPANSION/THREAT/RESOURCE/COORDINATION), payload_text (a short structured text string), and source_signal_id. Corpus starts empty and grows as signals are decoded.

#### Scenario: Corpus growth
- **WHEN** a Stage 2 signal is decoded by a Tier 3 Signal Detector
- **THEN** one new pattern entry is added to the corpus

### Requirement: Corpus Size Display in Signal Detector
The Signal Detector UI SHALL display the current corpus size as "Pattern Library: N entries" without further explanation of what patterns are or how they are used.

#### Scenario: Corpus size display
- **WHEN** corpus has 7 entries
- **THEN** Signal Detector UI shows "Pattern Library: 7 entries"

### Requirement: Corpus Content Authoring
The corpus SHALL contain pre-authored pattern entries that are unlocked (become available for random selection) when their associated revelation flag is set. Pre-authored entries reflect Architect communication patterns without making their meaning explicit.

#### Scenario: Flag-gated corpus entry
- **WHEN** revelation flag rf_4 is set
- **THEN** the corpus entries associated with rf_4 become available for selection during injection
