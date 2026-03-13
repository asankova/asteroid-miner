## Why

An information-dense game with hundreds of entities, multiple resource types, an event system, AI agents, and a narrative layer needs a HUD that scales with the player's operation without becoming overwhelming. The UI must feel like real mission control software — functional, precise, slightly austere — consistent with the hard sci-fi aesthetic. Information should be layered: ambient awareness at a glance, detail on demand.

## What Changes

- Design a **persistent HUD frame** with four anchored panels: top-left (resource summary bar), top-right (event/notification feed), bottom-left (selected entity detail panel), bottom-right (system status: power, compute budget, threat level)
- Implement **Minimap**: 150×150px minimap in bottom-right corner showing field overview with colored dots for entity types and highlighted sectors; click to navigate camera
- Add **Overlay Modes**: togglable overlays on the main canvas:
  - **Resource Overlay**: heat-map of ore concentration across field
  - **Power Overlay**: coverage and deficit zones colored by intensity
  - **Relay Overlay**: relay beacon coverage rings
  - **Compute Overlay**: per-sector compute allocation
  - **Threat Overlay**: Architect disturbance zones
- Implement **Context Panel**: clicking any entity (robot, asteroid, structure) opens a detail panel with all stats, current task, history, and available actions
- Add **Agent Reasoning Panel**: a collapsible drawer showing the active strategy agent's context window and current reasoning (from llm-strategy-agents); this is the signature educational UI element
- Implement **Production Flow View**: a visual graph of the current processing chain — nodes are structures, edges are material flows with throughput rates annotated
- Add **Research Panel**: tech tree visualized as a horizontal DAG; active research shown with progress bar; locked nodes grayed out
- Add **Event Log Panel**: scrollable full history of all events with timestamps and player choices
- Implement **Keyboard shortcuts**: G (overlay cycle), R (research), A (agent panel), E (event log), Tab (select next robot), Escape (deselect/close panel)

## Capabilities

### New Capabilities
- `hud-frame`: Persistent anchored panel layout system managing all HUD regions
- `minimap`: Field overview display with entity representation and click-navigation
- `overlay-system`: Togglable canvas overlays with heat-map and coverage rendering
- `context-panel`: Dynamic detail panel populating from any clicked entity's data model
- `production-flow-view`: Animated graph visualization of processing chain with live throughput
- `research-panel-ui`: Interactive DAG visualization of tech tree with progress display
- `keyboard-shortcut-manager`: Configurable keyboard shortcut dispatch for all HUD panels

### Modified Capabilities
- `camera-controller`: Gains minimap-click navigation input (from core-rendering-engine)
- `context-window-ui`: Integrated into Agent Reasoning Panel drawer (from llm-strategy-agents)

## Impact

- HUD must be implemented in a floating HTML/CSS layer above the WebGL canvas, not inside it
- All data bindings are read-only views of game state — HUD never writes to simulation directly (actions go through task queue)
- The Production Flow View is a significant visual component requiring a graph layout algorithm
- Keyboard shortcuts must not conflict with browser defaults
