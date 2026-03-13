## ADDED Requirements

### Requirement: Per-Structure Throughput Rate
The flow metrics system SHALL compute and expose the production rate (units/minute) for each processing structure, averaged over the last 60 seconds of game time.

#### Scenario: Throughput rate computation
- **WHEN** an Ore Smelter has processed 120 iron_bars in the last 60 seconds
- **THEN** its reported throughput rate is 2.0 iron_bars/minute

### Requirement: Bottleneck Detection
The system SHALL flag any structure whose idle ratio (fraction of ticks spent waiting) exceeds 50% as a bottleneck. Bottlenecks SHALL be highlighted in the production flow view.

#### Scenario: Bottleneck flag
- **WHEN** a Refinery idles more than 50% of ticks due to empty input buffer
- **THEN** it is flagged as an INPUT_STARVED bottleneck
