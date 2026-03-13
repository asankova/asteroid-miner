## Why

The game requires rendering thousands of simultaneous entities — asteroids, robots, particles, projectiles, resource flows — across a spatially vast field. Standard DOM/canvas rendering collapses at this scale. We need a WebGL-based particle/sprite engine with multi-resolution LOD that makes the game look stunning at every zoom level without destroying frame rate.

## What Changes

- Introduce a WebGL2 canvas renderer as the sole rendering backend
- Implement a 5-level zoom LOD system: field view → sector view → asteroid cluster → asteroid surface → equipment close-up
- Add a **decorative particle layer**: at zoom-out distances, inject 10–50k non-simulated decorative particles (dust, glints, nebula wisps) that are purely visual GPU-driven point sprites — no CPU tick
- Add instanced sprite rendering for robots and structures (one draw call per entity type regardless of count)
- Implement smooth zoom interpolation with detail cross-fade between LOD levels
- Add a camera controller: pan, zoom, keyboard shortcuts, minimap click-to-navigate
- Implement frustum culling so off-screen entities are never submitted to the GPU

## Capabilities

### New Capabilities
- `webgl-renderer`: Core WebGL2 rendering context, shader pipeline, frame loop
- `particle-system`: GPU-driven point sprite system for decorative and simulation particles
- `lod-manager`: Zoom-level classification and entity detail-level dispatch
- `camera-controller`: Pan/zoom/navigate with smooth interpolation and minimap integration
- `instanced-renderer`: Single-draw-call instanced rendering for large entity populations

### Modified Capabilities

## Impact

- All future rendering must go through the WebGL renderer API
- Sets the visual contract: 60fps at 10k+ visible entities, 100k+ decorative particles
- Downstream: all game entities register with the renderer; UI layer floats on top of canvas
- Dependencies: WebGL2-capable browser required; Three.js or raw WebGL (TBD in design)
