## ADDED Requirements

### Requirement: Configurable Shortcut Registry
The keyboard shortcut manager SHALL maintain a registry of {key, modifiers, action_id, description} entries. All shortcuts SHALL be registered at startup. Actions SHALL be dispatched by action_id string, not hardcoded key handlers.

#### Scenario: Shortcut dispatch
- **WHEN** player presses G
- **THEN** the "cycle-overlay" action is dispatched via the registry

### Requirement: Default Shortcut Set
The manager SHALL register the following default shortcuts on startup: G (cycle-overlay), R (toggle-research-panel), A (toggle-agent-panel), E (toggle-event-log), Tab (select-next-robot), Escape (deselect-all), F3 (toggle-perf-overlay).

#### Scenario: Default shortcut registration
- **WHEN** game starts
- **THEN** all 7 default shortcuts are registered and active

### Requirement: No Browser Default Conflicts
All registered shortcuts SHALL be checked against browser default actions (F1, F5, Ctrl+W, etc.). If a conflict is detected at registration, a console warning SHALL be emitted and the conflicting shortcut SHALL be skipped.

#### Scenario: Conflict detection
- **WHEN** a shortcut registration attempts to use F5 (browser refresh)
- **THEN** a console warning is emitted and F5 is not registered as a game shortcut
