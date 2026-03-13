## 1. Tool System

- [ ] 1.1 Define MiningToolType enum and ToolProfile data class (speed, energy, damage distribution, precision, compatibility weights)
- [ ] 1.2 Implement tool profiles for Percussive Drill, Thermal Lance, Explosive Charge, Precision Laser
- [ ] 1.3 Implement tool-robot compatibility validation in equipment slot assignment
- [ ] 1.4 Expose tool profile data as configurable JSON for balance tuning

## 2. Yield Calculator

- [ ] 2.1 Implement four-factor yield formula: concentration × tool_efficiency × robot_skill × integrity_modifier
- [ ] 2.2 Implement concurrent mining diminishing returns calculation
- [ ] 2.3 Implement mining task duration formula: hardness × tool_speed_modifier × 60s
- [ ] 2.4 Unit test yield formula across edge cases (zero integrity, max concurrent, min concentration)

## 3. Structural Integrity

- [ ] 3.1 Implement per-task integrity damage sampling from tool-specific normal distribution
- [ ] 3.2 Implement crack event emission and visual overlay trigger at 30% threshold
- [ ] 3.3 Implement fragment event emission and child asteroid creation at 0% threshold
- [ ] 3.4 Wire fragment event to asteroid-field-generation addAsteroid API

## 4. Ore Grade System

- [ ] 4.1 Implement grade calculation from yield value × precision modifier
- [ ] 4.2 Implement grade tier assignment (A/B/C/D) with tier boundary values
- [ ] 4.3 Store grade on inventory stack items
- [ ] 4.4 Implement grade efficiency lookup table for processing structures

## 5. Rare Yield Events

- [ ] 5.1 Implement Bernoulli rare yield trial on task completion
- [ ] 5.2 Define rare mineral types and their trigger payloads
- [ ] 5.3 Implement RARE_YIELD event emission with mineral_type field
- [ ] 5.4 Wire XENOMINERAL and other special types to research/narrative trigger listeners
- [ ] 5.5 Make all probability values data-driven via config file
