## ADDED Requirements

### Requirement: Log-Scale Entity Count Chart
The growth dashboard SHALL display a real-time chart of total robot count over time on a logarithmic Y-axis. The chart SHALL show a rolling 60-minute history. A linear view toggle SHALL switch the Y-axis to linear scale.

#### Scenario: Log-scale chart display
- **WHEN** robot count doubles from 100 to 200 to 400
- **THEN** the log-scale chart shows equal vertical spacing for each doubling

### Requirement: Doubling Time Calculator
The dashboard SHALL compute the current doubling time: the time elapsed for robot count to double from its value N minutes ago. Doubling time SHALL be computed over a 10-minute rolling window and displayed in minutes.

#### Scenario: Doubling time display
- **WHEN** robot count doubled from 200 to 400 in the last 8 minutes
- **THEN** the displayed doubling time is "~8 minutes"

### Requirement: Saturation Projection
The dashboard SHALL project the estimated time to 90% field saturation based on current growth rate and remaining extractable resources. Projection SHALL update every 60 seconds.

#### Scenario: Saturation projection
- **WHEN** current growth rate projects 90% saturation in 45 minutes
- **THEN** the dashboard displays "Saturation projected: ~45 min"
