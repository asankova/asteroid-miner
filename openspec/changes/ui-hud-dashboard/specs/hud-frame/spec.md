## ADDED Requirements

### Requirement: Four Persistent Panels
The HUD frame SHALL display four always-visible panels: top-left (resource summary bar showing counts of top-6 materials), top-right (event notification feed showing last 3 events), bottom-left (selected entity detail summary or "No selection"), bottom-right (system status: power bar, compute budget bar, threat level bar, solar efficiency indicator).

#### Scenario: Resource summary display
- **WHEN** the game is running
- **THEN** the top-left panel displays current counts for iron_ore, iron_bar, nickel_alloy, carbon_fiber, circuit_board, and memory_crystal

### Requirement: Notification Feed Auto-Dismiss
Event notifications in the top-right feed SHALL auto-dismiss after 8 seconds unless the player hovers over them. Hovering pauses auto-dismiss for all visible notifications. Clicking a notification opens the full event card.

#### Scenario: Auto-dismiss timing
- **WHEN** an event notification appears and the player does not interact with it
- **THEN** it fades out after 8 seconds

### Requirement: Panel Non-Interception
HUD panels SHALL not intercept mouse events that fall outside their bounds. Click-through to the canvas SHALL work in all unpaneled areas.

#### Scenario: Canvas click-through
- **WHEN** player clicks on the asteroid field in an area not covered by a HUD panel
- **THEN** the click is received by the canvas (camera pan, entity selection) not blocked by HUD
