## Context

The HUD must serve an extremely information-dense game without overwhelming the player. The design principle is "ambient awareness by default, detail on demand." The persistent HUD frame communicates the four most critical metrics at all times (resources, events, entity status, system health). Every other UI element is accessed through click or keyboard shortcut. The HUD is implemented as an HTML/CSS layer floating above the WebGL canvas — never inside it — so DOM updates never touch the rendering pipeline.

## Goals / Non-Goals

**Goals:**
- Persistent 4-panel HUD frame with resource, event, entity, and system summaries
- 150×150px minimap with entity dots and click-to-navigate
- Five togglable canvas overlays (resource, power, relay, compute, threat)
- Context panel for any clicked entity
- Collapsible agent reasoning drawer (from llm-strategy-agents)
- Production flow graph and research DAG panel
- Full keyboard shortcut manager

**Non-Goals:**
- Touchscreen/mobile UI (desktop keyboard+mouse only)
- Resizable panels (fixed layout in v1)
- UI themes or colorblind mode (accessibility pass in later proposal)

## Decisions

**HTML/CSS floating layer, not canvas UI**
All HUD elements are DOM elements positioned absolute/fixed above the canvas. This gives CSS transitions, accessibility, developer tools inspection, and avoids GPU state management for UI rendering. The canvas is read-only from the UI perspective.

**Data binding via polling at 10Hz, not reactive push**
The HUD polls game state from the main thread's game state mirror at 10Hz. No reactive framework overhead; no subscription management. Game state is the source of truth; the UI reads it. Alternative: React/Vue with game state store — adds build complexity and reactive re-render overhead that isn't needed for a 10Hz update rate.

**Production flow graph via force-directed layout library**
The production chain is a DAG of structures and material flows. A force-directed layout (e.g., d3-force) automatically positions nodes. Edges are animated SVG paths with throughput labels. Alternative: manual layout by player — too complex for v1.

**Keyboard shortcuts as a configurable dispatch table**
All shortcuts are registered in a central KeyboardShortcutManager as {key, modifiers, action} entries. Actions are string IDs mapped to functions. This makes the entire shortcut system inspectable and allows future user customization without code changes.

## Risks / Trade-offs

[10Hz polling may miss brief events that resolve in <100ms] → Events are buffered in the event notification feed; nothing is missed, just slightly delayed in display.

[Force-directed production flow graph may be unstable with many nodes] → Stabilize layout after initial settling; freeze node positions until user requests re-layout.

[Many overlays toggling may cause visual confusion] → Only one overlay can be active at a time; cycling with G key; overlay name shown in corner when active.
