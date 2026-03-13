## Why

The game must look spectacular at every zoom level. At full field view, the asteroid belt should feel vast and alive — dense with tiny particles, glinting minerals, ambient dust, and light scatter. As the player zooms in, the visual language shifts from impressionistic to precise. The "fake detail" system generates 100k+ visual-only particles on the GPU that cost nothing in simulation — pure spectacle.

## What Changes

- Implement **Decorative Particle Scheduler**: driven by camera zoom level, injects different categories of non-simulated GPU particles: dust clouds (zoom 0–2), mineral glints (zoom 1–3), rock fragment sprites (zoom 2–4), surface texture particles (zoom 3–5); each category has its own shader, color palette, and motion profile
- Add **Procedural Rock Surface Textures**: at close zoom, asteroid surfaces are rendered with a layered shader: base rock texture + vein overlay (color-coded by resource type) + weathering pass + specular highlights from the in-system star; textures are generated procedurally per-asteroid using surface seed
- Implement **Ambient Field Effects**: non-interactive visual elements that fill the field at zoom-out: dust lanes (Gaussian splat strips), distant glowing ice plumes from V-type asteroids, occasional debris trails from fragmented asteroids, faint star field background
- Add **Entity Visual LOD**: at zoom level 1–2, robots are rendered as colored dots with a motion trail; at zoom 3, they become simplified sprites; at zoom 4–5, full-detail sprites with equipment visible; transitions are smooth cross-fades
- Implement **Signal Visual Effects**: when the signal detector is active and signals are detected, Fourier-like wave patterns ripple outward from X-type asteroids; these are purely decorative at first but their visual language becomes familiar so that late-game pattern injection is immediately recognizable
- Add **Night/Day Cycle for Star Illumination**: the in-system star position cycles slowly; asteroid shadows, illumination angles, and solar array efficiency all update with star position; creates dramatic visual variation

## Capabilities

### New Capabilities
- `decorative-particle-scheduler`: Zoom-level-responsive GPU particle injection system for non-simulated visual particles
- `procedural-surface-shader`: Per-asteroid surface rendering with vein overlay, weathering, and specular layers
- `ambient-field-effects`: Static and animated background visual elements (dust lanes, ice plumes, debris trails)
- `entity-visual-lod`: Zoom-responsive entity rendering switching between dot, sprite, and detail representations
- `signal-visual-fx`: Decorative wave/pattern effects emanating from signal-active asteroids
- `star-illumination`: Slow-cycling star position with shadow and efficiency updates

### Modified Capabilities
- `webgl-renderer`: Gains decorative particle pipeline, surface shader integration, and star illumination pass (from core-rendering-engine)
- `lod-manager`: Gains entity visual LOD dispatch (from core-rendering-engine)

## Impact

- Decorative particles are GPU-only and must not touch the CPU simulation; any simulation coupling defeats the purpose
- Signal visual effects must establish a visual vocabulary the player unconsciously learns — critical for late-game narrative resonance
- Surface shaders are per-asteroid but must be generated lazily (only when asteroid enters zoom range) to avoid startup cost
- This proposal depends on core-rendering-engine being complete
