## 1. Project Setup

- [ ] 1.1 Create `src/renderer/` module directory with index.ts entry point
- [ ] 1.2 Add WebGL2 type definitions (`@types/webgl2`) to package.json
- [ ] 1.3 Create canvas element management utility (fullscreen resize handler)
- [ ] 1.4 Implement WebGL2 context initialization with fallback error display

## 2. Shader Pipeline

- [ ] 2.1 Write world layer vertex/fragment shaders (static asteroid geometry)
- [ ] 2.2 Write entity layer instanced vertex/fragment shaders with 8-attribute per-instance layout
- [ ] 2.3 Write particle update Transform Feedback shader (position + velocity + lifetime)
- [ ] 2.4 Write particle render point-sprite fragment shader with category-specific color/alpha
- [ ] 2.5 Write LOD cross-fade composite shader (dual-input alpha blend)
- [ ] 2.6 Implement shader compilation pipeline with error reporting

## 3. Instance Renderer

- [ ] 3.1 Implement Float32 instance buffer with 8 attributes per instance
- [ ] 3.2 Implement dirty-flag tracking per instance for partial bufferSubData updates
- [ ] 3.3 Implement `drawArraysInstanced` call batched by entity type
- [ ] 3.4 Integrate spatial hash frustum culling into instance buffer population

## 4. Particle System

- [ ] 4.1 Allocate Transform Feedback double-buffer for particle pool (max 150k slots)
- [ ] 4.2 Implement ring-buffer particle slot reuse
- [ ] 4.3 Implement zoom-level particle category scheduler (inject/remove categories on zoom change)
- [ ] 4.4 Wire particle category parameters (dust, glint, rock-fragment, surface-texture) to shader uniforms

## 5. LOD Manager

- [ ] 5.1 Define LOD level thresholds (world units per viewport pixel for L0–L4)
- [ ] 5.2 Implement LOD level change detection and entity notification broadcast
- [ ] 5.3 Implement 200ms cross-fade alpha interpolation on LOD transition
- [ ] 5.4 Add LOD level display to debug overlay

## 6. Camera Controller

- [ ] 6.1 Implement mouse drag pan with 1:1 world-space mapping
- [ ] 6.2 Implement scroll-wheel zoom centered on pointer with LOD-range clamping
- [ ] 6.3 Implement WASD/arrow key pan at configurable speed
- [ ] 6.4 Implement minimap click → smooth 300ms camera animation
- [ ] 6.5 Add camera bounds enforcement (prevent panning outside field extents)

## 7. Four-Layer Render Loop

- [ ] 7.1 Implement main render loop with requestAnimationFrame
- [ ] 7.2 Implement render pass ordering: world → entity → decorative → UI
- [ ] 7.3 Add frame timing and fps counter to debug overlay
- [ ] 7.4 Profile full render pipeline under 10k entity + 100k particle load; optimize hot paths
