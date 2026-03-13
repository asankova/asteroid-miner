## ADDED Requirements

### Requirement: Four Structure Types
The system SHALL define four processing structure types: Ore Smelter (Tier 1→2, medium throughput), Refinery (Tier 2→3, slow), Cryogenic Processor (ice→cryo_ice/coolant_pack), Molecular Assembler (Tier 2→3 advanced, high power). Each SHALL have defined batch_size, tick_rate, power_consumption, input_buffer_max, and output_buffer_max.

#### Scenario: Smelter processing
- **WHEN** an Ore Smelter has sufficient iron_ore in its input buffer and adequate power
- **THEN** it consumes 4 iron_ore per tick and produces 1 iron_bar per tick

### Requirement: Power-Dependent Processing
Processing SHALL halt when available power drops below the structure's power_consumption requirement. A power deficit SHALL be visually indicated on the structure and reported in flow metrics.

#### Scenario: Power deficit halt
- **WHEN** available power drops below the Molecular Assembler's requirement
- **THEN** the Assembler halts processing and emits a POWER_DEFICIT event

### Requirement: Buffer Backpressure
When a structure's output buffer is full, it SHALL stop processing even if input buffer has items. When input buffer is empty, it SHALL idle. Both states SHALL be reported in flow metrics.

#### Scenario: Output buffer full
- **WHEN** a Smelter's output buffer reaches max capacity
- **THEN** the Smelter stops consuming input and idles until output buffer has capacity
