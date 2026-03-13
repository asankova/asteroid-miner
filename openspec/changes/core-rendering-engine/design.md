## Context

The game renders a spatially vast asteroid belt with thousands of concurrent entities — asteroids, robots, structures, particles, resource flows. Browser canvas 2D APIs collapse at this scale. WebGL2 with instanced rendering and GPU-driven particles is the only viable path to 60fps with 100k+ visible elements. The rendering layer must also support a five-level zoom LOD system that cross-fades visual detail smoothly. This is the foundational system; every other proposal's visual output runs through it.

## Goals / Non-Goals

**Goals:**
- 60fps sustained with 10k+ simulated entities and 100k+ decorative GPU particles
- Five distinct zoom LOD levels with smooth cross-fade transitions
- Single draw call per entity type via instanced rendering
- Frustum culling eliminating off-screen entity GPU submissions
- Pluggable camera controller with pan/zoom/minimap integration

**Non-Goals:**
- 3D rendering (game is 2D top-down)
- Mobile browser support in v1
- Custom shader editor or user-facing graphics settings beyond basic quality toggle
- Sound engine (separate proposal)

## Decisions

**WebGL2 over Three.js**
Raw WebGL2 avoids Three.js abstraction overhead; we control buffer layout and shader programs directly. Three.js adds ~600KB and its scene graph is wasteful for 2D point sprites. Alternative considered: PixiJS — rejected because its instancing API doesn't support custom per-instance attribute buffers efficiently for our telemetry-linked particle system.

**GPU-only decorative particles via Transform Feedback**
Non-simulated particles (dust, glints, debris) are driven entirely on the GPU using a particle update shader and Transform Feedback buffers. Zero CPU tick per particle. Alternative considered: CPU particles with typed arrays — rejected because updating 100k positions per frame at 60fps costs ~6ms on a mid-range CPU.

**Separate render layers: world, entities, decorative, UI**
Four distinct render passes composited in order. World layer: static asteroid geometry. Entity layer: instanced robots/structures. Decorative layer: GPU particles. UI layer: HTML/CSS float above canvas. This allows per-layer culling and shader switches without state thrashing.

**Float32 instance buffer with 8 attributes per instance**
Each instance: x, y, scale, rotation, sprite_index, color_r, color_g, alpha. 32 bytes per instance. At 10k entities: 320KB GPU buffer — fast to update via bufferSubData on dirty instances only.

## Risks / Trade-offs

[WebGL2 not supported in all environments] → Detect at startup; fail fast with clear user message. Safari added WebGL2 in 2021; this is acceptable baseline.

[100k GPU particles + 10k entity instances may exceed mobile GPU limits] → Mobile is non-goal for v1; desktop baseline is GTX 1060 class.

[Transform Feedback is WebGL2-only] → Acceptable given WebGL2 requirement.

[LOD cross-fade shader complexity] → Use a simple alpha blend based on zoom delta; avoid complex shader branching.

[Frustum culling on 2000+ asteroids per frame] → Spatial hash gives O(1) viewport query; asteroid positions are largely static so culling cache is warm.
