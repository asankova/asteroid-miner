## ADDED Requirements

### Requirement: Exponential Relevance Decay
Each event in the agent context buffer SHALL have its relevance score multiplied by decay_factor^(age_in_minutes) where decay_factor=0.95 per minute. Events with relevance score below 0.01 SHALL be removed from the context buffer.

#### Scenario: Event decay and removal
- **WHEN** an event has been in context for 60 minutes with initial relevance 1.0
- **THEN** its relevance score is approximately 0.95^60 ≈ 0.046, approaching the removal threshold

### Requirement: Reasoning Quality Indicator
The context window UI SHALL display a "Reasoning Quality" meter computed as the mean relevance score of the top-10 context items. When quality drops below 50%, a visual warning is shown: "Context aging — decision quality degraded."

#### Scenario: Quality warning display
- **WHEN** mean relevance of top-10 items falls below 0.5
- **THEN** the Reasoning Quality meter shows a warning state and the meter color changes to amber
