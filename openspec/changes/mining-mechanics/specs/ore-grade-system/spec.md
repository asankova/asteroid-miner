## ADDED Requirements

### Requirement: Four Ore Grade Tiers
Extracted ore SHALL be assigned a grade tier: A (0.75–1.0), B (0.50–0.75), C (0.25–0.50), D (0.0–0.25), computed from the yield_calculator output with tool precision modifier applied. Grade is stored per inventory stack.

#### Scenario: Laser grade A output
- **WHEN** Precision Laser mines high-concentration asteroid (concentration=0.9)
- **THEN** extracted ore is assigned grade A with high probability

### Requirement: Grade Affects Processing Efficiency
When ore enters a processing structure (smelter/refinery), the grade tier SHALL determine output efficiency: A=100%, B=80%, C=60%, D=40%.

#### Scenario: Grade D processing penalty
- **WHEN** grade D ore is input to a smelter
- **THEN** the smelter produces 40% of the nominal refined material output
