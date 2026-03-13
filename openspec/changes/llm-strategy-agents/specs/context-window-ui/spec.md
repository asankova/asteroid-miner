## ADDED Requirements

### Requirement: Scrollable Context Display
The context window UI SHALL display the active agent's context buffer as a scrollable list of event entries. Each entry SHALL show: timestamp, event type icon, event summary text, and relevance score bar.

#### Scenario: Context list display
- **WHEN** a Tier 1 agent is active with 50 events in context
- **THEN** the context window shows up to 50 entries in reverse chronological order with relevance scores

### Requirement: Top-10 Relevant Items Default View
By default, the context window SHALL show only the 10 highest-relevance-score items. A "Show All" toggle SHALL reveal the full context.

#### Scenario: Default relevance filter
- **WHEN** context window is opened for a Tier 2 agent with 500 events
- **THEN** only the 10 highest-scoring events are shown until "Show All" is toggled

### Requirement: Active Reasoning Highlight
When the agent is currently reasoning (processing a decision), the context items used for that decision SHALL be highlighted in the context window. The reasoning conclusion SHALL be displayed in a separate "Current Reasoning" panel below the context list.

#### Scenario: Reasoning highlight
- **WHEN** an agent completes a decision cycle
- **THEN** the context items that influenced the decision are highlighted for 3 seconds

### Requirement: Pattern Injection Visual Anomaly
When the substrate-narrative system injects signal corpus patterns into the Tier 3 agent context at Resonant band, the injected entries SHALL display with a subtle visual distinction (different background color, no source tag) compared to normal context entries.

#### Scenario: Pattern injection visual marker
- **WHEN** a signal corpus pattern is injected into Tier 3 context at Resonant substrate band
- **THEN** the entry appears in the context window with a distinct visual style without identifying its source
