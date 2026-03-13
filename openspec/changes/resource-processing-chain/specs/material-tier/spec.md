## ADDED Requirements

### Requirement: Three-Tier Material Hierarchy
The material system SHALL define three tiers: Tier 1 (raw ore: iron_ore, nickel_ore, silica, carbon, ice, rare_earth_ore), Tier 2 (refined: iron_bar, nickel_alloy, carbon_fiber, silica_glass, cryo_ice, rare_earth_concentrate), Tier 3 (advanced: hull_plate, circuit_board, drive_cell, coolant_pack, memory_crystal). Each material SHALL have a tier, display name, stack size, and icon reference.

#### Scenario: Material tier query
- **WHEN** code queries the tier of "circuit_board"
- **THEN** the returned tier is 3

### Requirement: Processing Recipes
Each Tier 2 and Tier 3 material SHALL have one or more recipes defining required inputs (material type + quantity), output quantity, processing time in ticks, and required structure type.

#### Scenario: Iron bar recipe
- **WHEN** the iron_bar recipe is evaluated
- **THEN** it requires 4 iron_ore as input, produces 1 iron_bar, takes 1 tick, and requires an Ore Smelter
