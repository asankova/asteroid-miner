## ADDED Requirements

### Requirement: 20-Minute Illumination Cycle
The star position SHALL complete one full revolution around the field in 20 real-time minutes. Star angle is stored as a float (0–2π) updated each frame. All illumination-dependent effects SHALL use this angle.

#### Scenario: Star cycle period
- **WHEN** 20 minutes of real time elapse
- **THEN** the star has completed exactly one revolution and is back to its starting angle

### Requirement: Shadow Direction from Star Angle
Asteroid shadows SHALL be rendered as a screen-space darkening on the side opposite the star direction. Shadow direction SHALL update each frame from the star angle uniform.

#### Scenario: Shadow direction update
- **WHEN** star angle changes by 90 degrees
- **THEN** asteroid shadow directions rotate by 90 degrees to match

### Requirement: Solar Array Efficiency Scaling
Solar Array power generation SHALL be multiplied by a factor that varies with star angle: at 0° (star directly overhead equivalent): 1.0; at 90°: 0.75; at 180° (opposite): 0.5. The HUD SHALL show a "solar efficiency" indicator.

#### Scenario: Low-angle solar penalty
- **WHEN** star angle is at 180° relative to a Solar Array
- **THEN** that Solar Array's power output is 50% of its nominal rating
