## ADDED Requirements

### Requirement: Template-Based Decision Generation
The decision engine SHALL select decision templates from a bank of 20+ templates per decision category (mining target selection, hauler routing, expansion planning, threat response). Templates are filled with context-derived values to produce structured output.

#### Scenario: Template selection diversity
- **WHEN** the agent makes 20 consecutive mining target decisions
- **THEN** at least 5 different template variants are used across the 20 decisions

### Requirement: Context Event Relevance Scoring
The engine SHALL score each context event by: recency (exponential decay), event type weight (threat events score higher than routine telemetry), and decision relevance (events matching the current decision category score higher).

#### Scenario: Threat event prioritization
- **WHEN** a THREAT_DETECTED event and a routine TASK_COMPLETED event are both in context
- **THEN** the THREAT_DETECTED event receives a higher relevance score regardless of relative age

### Requirement: Chain-of-Thought Step Display
The engine SHALL produce a chain-of-thought reasoning trace for each decision: a list of 3–5 reasoning steps that explain how the context led to the conclusion. Steps are displayed in the "Current Reasoning" panel.

#### Scenario: Reasoning steps count
- **WHEN** the agent completes a decision
- **THEN** the reasoning trace contains between 3 and 5 steps
