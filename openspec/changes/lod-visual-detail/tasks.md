## 1. Decorative Particle Scheduler

- [ ] 1.1 Create separate Transform Feedback buffer for decorative particles (GPU memory-scaled budget)
- [ ] 1.2 Implement GPU memory detection for particle budget scaling (150k/50k/20k)
- [ ] 1.3 Implement zoom-level particle category activation/deactivation logic
- [ ] 1.4 Author particle shader programs for each category (dust, glint, rock-fragment, surface-texture)
- [ ] 1.5 Profile GPU cost at 150k decorative + 50k simulation particles simultaneously

## 2. Procedural Surface Shader

- [ ] 2.1 Author three-layer surface shader (base noise, vein overlay, weathering + specular)
- [ ] 2.2 Implement per-asteroid uniform parameter generation (lazy, on L3 entry)
- [ ] 2.3 Implement vein color palette per resource type (6 resource type color sets)
- [ ] 2.4 Wire star illumination angle to surface shader specular uniform each frame

## 3. Ambient Field Effects

- [ ] 3.1 Implement static ambient mesh generation from field density noise map at world creation
- [ ] 3.2 Implement UV scroll animation via time uniform (no per-frame CPU update)
- [ ] 3.3 Implement debris trail particle effect on asteroid fragmentation events
- [ ] 3.4 Implement ice plume sprites for V-type asteroids (billboarded sprites, subtle glow shader)

## 4. Entity Visual LOD

- [ ] 4.1 Author LOD-Low (2px point sprite), LOD-Mid (8px sprite), LOD-High (32px detail sprite) for each entity type
- [ ] 4.2 Implement 150ms alpha cross-fade on LOD visual representation transitions
- [ ] 4.3 Wire LOD visual level to LOD manager level dispatch

## 5. Signal Visual FX

- [ ] 5.1 Implement ring pulse shader: expanding concentric rings with parametric radius and fade
- [ ] 5.2 Implement ring count scaling by awakening stage (1 ring at stage 1, 3 at stage 4)
- [ ] 5.3 Implement per-asteroid ring frequency from individual disturbance contribution
- [ ] 5.4 Test visual legibility of ring effects at all LOD levels

## 6. Star Illumination

- [ ] 6.1 Implement star angle accumulator with 20-minute period
- [ ] 6.2 Wire star angle to surface shader specular uniform and shadow direction uniform
- [ ] 6.3 Implement solar efficiency multiplier: cos(star_angle) mapped to [0.5, 1.0] range
- [ ] 6.4 Implement solar efficiency indicator in HUD
