## Context

The LOD visual detail system makes the game look spectacular without adding simulation cost. Every effect here is purely visual — no CPU simulation, no gameplay effect. The decorative particle scheduler runs entirely on the GPU via Transform Feedback; the surface shaders run per-pixel with no CPU geometry. The design principle: more visual complexity at distance (where the GPU processes fewer pixels but the scene needs to feel vast) and more precise detail at close range (where the player is looking carefully). Signal visual effects serve double duty: they look beautiful and they train the player's eye to recognize patterns that become narratively significant later.

## Goals / Non-Goals

**Goals:**
- 100k+ GPU decorative particles with zero CPU cost
- Procedural surface shaders per-asteroid (vein, weathering, specular)
- Ambient field effects (dust lanes, ice plumes, debris trails)
- Zoom-responsive entity visual LOD (dot → sprite → detail)
- Signal wave effects from X-type asteroids
- Slow star illumination cycle

**Non-Goals:**
- Dynamic weather or asteroid atmosphere (vacuum setting)
- Destructible asteroid geometry (fragmentation is handled by simulation, not renderer)
- Player-configurable visual settings (single quality tier in v1)

## Decisions

**Decorative particles use a separate Transform Feedback buffer from simulation particles**
Simulation particles (resource flows, mining effects) need CPU coordination. Decorative particles need none. Keeping them in a separate TF buffer avoids any risk of simulation coupling. Buffer size: 150k slots for decorative (vs 50k for simulation).

**Surface shaders are generated lazily per-asteroid on first close zoom**
Generating 5000 asteroid surface shaders at startup would cost 2–3 seconds. Instead, shaders are parameterized with per-asteroid uniforms (vein color, noise seed, weathering level) and generated when the asteroid first enters LOD L3 range. Shader program itself is one; uniforms vary.

**Ambient field effects as a single static mesh pass**
Dust lanes, ice plumes, and background star fields are rendered as a large static mesh (generated once at world creation from the field's noise data) with a scrolling UV animation. No per-frame CPU update — the mesh is uploaded once and the animation is driven by a time uniform.

**Signal visual FX as a Fourier ring shader**
Concentric ring pulses emanating from X-type asteroids are rendered as a screen-space shader effect: rings are defined by time-modulated radius functions. The frequency of the rings (number of rings per second) increases with awakening stage. Players learn to associate ring frequency with disturbance level before they understand why.

**Star illumination cycle: 20-minute real-time period**
Long enough to feel ambient rather than distracting; short enough that the player notices it over a play session. Star angle drives: shadow direction, specular highlight angle, and solar array efficiency multiplier. Solar arrays lose 20% efficiency when the star is at a low angle.

## Risks / Trade-offs

[150k decorative particles + surface shaders + ambient mesh may exceed GPU VRAM on older hardware] → Decorative particle count scales with GPU memory detected at startup (150k on 4GB+, 50k on 2GB, 20k on 1GB).

[Surface shader lazy generation may cause a visible stutter on first close zoom] → Pre-generate surface shader parameters for all asteroids at startup (fast); upload to GPU on demand.

[Ring shader frequency as awakening indicator may be too subtle] → Test with naive players; if not noticed organically, add a faint audio tone that matches ring frequency.
