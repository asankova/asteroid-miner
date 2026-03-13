## ADDED Requirements

### Requirement: Five Exclusive Overlays
The overlay system SHALL support five canvas overlays: Resource (heat-map of ore concentration), Power (coverage and deficit zones), Relay (beacon coverage rings), Compute (per-sector allocation bars), Threat (Architect disturbance intensity zones). Only one overlay SHALL be active at a time.

#### Scenario: Single active overlay
- **WHEN** the Resource overlay is active and player presses G
- **THEN** the Power overlay activates and the Resource overlay deactivates

### Requirement: Cycle via G Key
Pressing G SHALL cycle through overlays in order (None → Resource → Power → Relay → Compute → Threat → None). The active overlay name SHALL be displayed in the top-center of the screen.

#### Scenario: G key cycling
- **WHEN** player presses G five times from None state
- **THEN** the Threat overlay is active

### Requirement: Heat-Map Rendering
The Resource overlay SHALL render a canvas heat-map using the field's resource concentration data sampled at 64×64 grid resolution. Color mapping: iron=blue, nickel=green, rare-earth=red, mixed=yellow. Heat-map SHALL update every 5 seconds.

#### Scenario: Resource heat-map update
- **WHEN** Resource overlay is active
- **THEN** the heat-map refreshes every 5 seconds to reflect current extraction state
