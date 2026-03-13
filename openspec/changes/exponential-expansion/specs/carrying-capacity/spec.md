## ADDED Requirements

### Requirement: Resource Saturation Tracking
The carrying capacity system SHALL track extraction saturation per asteroid as the ratio of total extracted mass to total available mass. Global saturation SHALL be the mean across all asteroids that have been mined at least once.

#### Scenario: Saturation computation
- **WHEN** an asteroid has had 60% of its resources extracted
- **THEN** its saturation value is 0.60

### Requirement: Marginal Yield Decay Curve
Mining yield SHALL be multiplied by a saturation modifier: yield × (1 - 0.7 × saturation^2). At 0% saturation: modifier = 1.0 (full yield). At 50% saturation: modifier = 0.825. At 90% saturation: modifier = 0.433.

#### Scenario: Mid-saturation yield
- **WHEN** local saturation is 0.5
- **THEN** yield modifier is 1 - 0.7 × 0.25 = 0.825

### Requirement: Saturation Curve Display
The dashboard SHALL display a saturation curve chart showing yield modifier on Y-axis vs saturation on X-axis, with the current global saturation position marked on the curve.

#### Scenario: Current saturation marker
- **WHEN** global saturation is 0.7
- **THEN** the saturation curve chart has a marker at x=0.7 on the displayed curve
