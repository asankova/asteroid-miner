## ADDED Requirements

### Requirement: Event Card Structure
Each event card SHALL display: title (≤60 characters), category icon, body text (2–3 paragraphs, Lem-style prose), and 1–3 choice buttons. Choice buttons show choice text (≤40 characters) and an optional consequence summary.

#### Scenario: Card display structure
- **WHEN** an event fires
- **THEN** the event card displays title, category icon, body text, and choice buttons in the defined layout

### Requirement: Five Event Categories
Events SHALL be categorized as: Geological (rock/field phenomena), Technical (equipment/automation behavior), Historical (derelict data recovery), First Contact (Architect-related), Philosophical (AI agent behavior). Category SHALL determine icon and card color accent.

#### Scenario: Category icon display
- **WHEN** a First Contact event fires
- **THEN** the event card displays the First Contact icon and color accent

### Requirement: Consequence Summary on Hover
Hovering over a choice button SHALL display a brief consequence summary: what the player will gain or lose. Summary is generated from the consequence payload and displayed as a tooltip.

#### Scenario: Consequence hover
- **WHEN** player hovers over a choice button with an ADD_RP consequence
- **THEN** a tooltip displays "+500 Research Points"
