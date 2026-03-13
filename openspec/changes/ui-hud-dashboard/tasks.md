## 1. HUD Frame

- [ ] 1.1 Implement fixed HUD layout with 4 panel zones (top-left, top-right, bottom-left, bottom-right)
- [ ] 1.2 Implement resource summary bar with top-6 material counts polled at 10Hz
- [ ] 1.3 Implement event notification feed with 8-second auto-dismiss and hover-pause
- [ ] 1.4 Implement system status panel: power bar, compute bar, threat bar, solar efficiency
- [ ] 1.5 Verify click-through in non-panel areas reaches canvas

## 2. Minimap

- [ ] 2.1 Implement 150×150px Canvas element with field-to-minimap coordinate transform
- [ ] 2.2 Implement entity dot rendering (asteroids 1px, robots 2px, structures 3px with type colors)
- [ ] 2.3 Implement camera viewport rectangle overlay
- [ ] 2.4 Implement click-to-navigate: map click → camera controller smooth navigation

## 3. Overlay System

- [ ] 3.1 Implement overlay layer as a secondary canvas overlay above main canvas
- [ ] 3.2 Implement G-key cycle through 5 overlays + None state
- [ ] 3.3 Implement Resource overlay: 64×64 heat-map with 5-second refresh
- [ ] 3.4 Implement Power overlay: coverage/deficit zones
- [ ] 3.5 Implement Relay overlay: beacon coverage circles
- [ ] 3.6 Implement Compute overlay: per-sector allocation bars
- [ ] 3.7 Implement Threat overlay: disturbance intensity zones

## 4. Context Panel

- [ ] 4.1 Implement click-to-select entity detection via spatial hash query on canvas click
- [ ] 4.2 Implement robot context panel with stats, task, and action buttons
- [ ] 4.3 Implement asteroid context panel with type, resources, integrity, disturbance
- [ ] 4.4 Implement structure context panel with throughput, power, health, upgrade button
- [ ] 4.5 Implement in-place panel update on entity re-selection

## 5. Production Flow View

- [ ] 5.1 Integrate d3-force for structure node layout
- [ ] 5.2 Implement animated throughput edges (particle dots, speed proportional to rate)
- [ ] 5.3 Implement node status color coding (green/amber/red)
- [ ] 5.4 Implement layout stabilization after initial settling

## 6. Research Panel UI

- [ ] 6.1 Implement horizontal DAG layout with 5 branch swimlanes
- [ ] 6.2 Implement node visual states (solid/hollow/gray)
- [ ] 6.3 Implement active research progress fill animation
- [ ] 6.4 Implement Xenomineralogy swimlane lock state (grayed until unlock flag)

## 7. Keyboard Shortcuts

- [ ] 7.1 Implement KeyboardShortcutManager with registry, dispatch, and browser conflict detection
- [ ] 7.2 Register all 7 default shortcuts on startup
- [ ] 7.3 Implement console warning for conflicting shortcuts
