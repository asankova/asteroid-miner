#version 300 es
precision mediump float;

in float v_spriteIndex;
in vec3 v_color;
in float v_alpha;
in vec2 v_uv;

out vec4 fragColor;

void main() {
  vec2 centered = v_uv - 0.5;

  // Sprite type shapes:
  // 0=Scout: circle (fast, agile)
  // 1=Miner: diamond (heavy, industrial)
  // 2=Hauler: rounded square (cargo)
  // 3=Builder: triangle (construction)
  // 4=Fabricator: hexagon (precision)
  // 5=Sentinel: cross/plus (combat)

  float inside = 0.0;
  float glow = 0.0;

  if (v_spriteIndex < 0.5) {
    // Scout: circle
    float d = length(centered);
    inside = step(d, 0.40);
    glow = smoothstep(0.50, 0.35, d) - inside;
  } else if (v_spriteIndex < 1.5) {
    // Miner: diamond
    float d = abs(centered.x) + abs(centered.y);
    inside = step(d, 0.40);
    glow = smoothstep(0.50, 0.38, d) - inside;
  } else if (v_spriteIndex < 2.5) {
    // Hauler: rounded square
    vec2 q = abs(centered) - 0.30;
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
    inside = step(d, 0.08);
    glow = smoothstep(0.18, 0.06, d) - inside;
  } else if (v_spriteIndex < 3.5) {
    // Builder: triangle (pointing up)
    float d = max(abs(centered.x) * 1.15 - centered.y * 0.67, -centered.y - 0.28);
    inside = step(d, 0.02);
    glow = smoothstep(0.12, 0.0, d) - inside;
  } else if (v_spriteIndex < 4.5) {
    // Fabricator: hexagon
    vec2 q = abs(centered);
    float d = max(q.x * 0.866 + q.y * 0.5, q.y) - 0.38;
    inside = step(d, 0.0);
    glow = smoothstep(0.10, -0.02, d) - inside;
  } else {
    // Sentinel: cross/plus
    float arm = min(
      max(abs(centered.x) - 0.12, abs(centered.y) - 0.40),
      max(abs(centered.x) - 0.40, abs(centered.y) - 0.12)
    );
    inside = step(arm, 0.0);
    glow = smoothstep(0.08, -0.02, arm) - inside;
  }

  if (inside < 0.5 && glow < 0.01) discard;

  // Type-specific colors
  vec3 typeColor;
  if (v_spriteIndex < 0.5)      typeColor = vec3(0.20, 0.90, 1.00); // Scout: cyan
  else if (v_spriteIndex < 1.5) typeColor = vec3(1.00, 0.55, 0.10); // Miner: orange
  else if (v_spriteIndex < 2.5) typeColor = vec3(1.00, 0.90, 0.20); // Hauler: yellow
  else if (v_spriteIndex < 3.5) typeColor = vec3(0.20, 1.00, 0.35); // Builder: green
  else if (v_spriteIndex < 4.5) typeColor = vec3(0.75, 0.25, 1.00); // Fabricator: purple
  else                          typeColor = vec3(1.00, 0.20, 0.20); // Sentinel: red

  // Core brightness with slight shading toward edges
  float brightness = mix(0.6, 1.0, inside);
  vec3 col = typeColor * brightness;

  // Outer glow in type color
  vec3 finalColor = mix(typeColor * 0.5, col, inside);
  float finalAlpha = v_alpha * (inside + glow * 0.6);

  fragColor = vec4(finalColor, finalAlpha);
}
