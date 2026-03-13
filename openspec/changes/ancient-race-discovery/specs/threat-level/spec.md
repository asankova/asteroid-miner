## ADDED Requirements

### Requirement: One-Way Threat Ratchet
The threat level SHALL be a float value (0.0–100.0) that only increases. Threat increments at: Stage transitions (+10 per stage), Architect entity interference events (+1 each), equipment malfunction events (+0.5 each). Threat never decreases.

#### Scenario: Stage transition threat increment
- **WHEN** awakening transitions from Stage 2 to Stage 3
- **THEN** threat level increases by 10.0

### Requirement: Threat Level HUD Display
Threat level SHALL be displayed in the HUD system status panel as a labeled progress bar. At threat ≥ 50, the bar color changes from green to amber. At threat ≥ 80, it changes to red with a pulsing animation.

#### Scenario: High threat visual warning
- **WHEN** threat level reaches 80.0
- **THEN** the HUD threat bar displays in red with a pulsing animation

### Requirement: Threat Level Feeds Agent Context
The current threat level SHALL be included in all strategy agent context windows as a high-priority event. Threat increase events SHALL be scored with maximum relevance weight in the decision engine.

#### Scenario: Threat in agent context
- **WHEN** a threat level increase event occurs
- **THEN** it is added to all active agent context buffers with maximum relevance score
