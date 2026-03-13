## ADDED Requirements

### Requirement: Four-Factor Yield Formula
The yield calculator SHALL compute resource yield as: yield = concentration × tool_efficiency × robot_skill_level × integrity_modifier, where integrity_modifier = max(0.5, structural_integrity). The result SHALL be multiplied by a concurrent_mining_diminishing_returns factor.

#### Scenario: Full integrity yield
- **WHEN** mining an asteroid with structural_integrity=1.0 and concentration=0.8
- **THEN** integrity_modifier is 1.0 and yield reflects the full concentration × efficiency product

#### Scenario: Low integrity penalty
- **WHEN** mining an asteroid with structural_integrity=0.2
- **THEN** integrity_modifier is 0.5 and yield is halved relative to full integrity

### Requirement: Concurrent Mining Diminishing Returns
When N robots mine the same asteroid simultaneously, each robot's yield SHALL be multiplied by 1/(1 + 0.1×(N-1)) up to a minimum of 0.5. This represents physical access competition.

#### Scenario: Concurrent diminishing returns
- **WHEN** 6 robots mine the same asteroid simultaneously
- **THEN** each robot's yield is multiplied by 1/(1 + 0.5) = 0.667
