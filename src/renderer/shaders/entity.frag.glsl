#version 300 es
precision mediump float;

in float v_spriteIndex;
in vec3 v_color;
in float v_alpha;
in vec2 v_uv;

out vec4 fragColor;

void main() {
  // Simple geometric sprite: diamond shape for robots
  vec2 centered = v_uv - 0.5;
  float diamond = abs(centered.x) + abs(centered.y);
  if (diamond > 0.45) discard;

  // Core bright, edge dims
  float brightness = 1.0 - diamond * 1.8;
  vec3 col = v_color * brightness;

  // Sprite type coloring by spriteIndex
  // 0=Scout (cyan), 1=Miner (orange), 2=Hauler (yellow), 3=Builder (green), 4=Fabricator (purple), 5=Sentinel (red)
  if (v_spriteIndex < 0.5) col *= vec3(0.3, 1.0, 1.0);
  else if (v_spriteIndex < 1.5) col *= vec3(1.0, 0.6, 0.2);
  else if (v_spriteIndex < 2.5) col *= vec3(1.0, 1.0, 0.3);
  else if (v_spriteIndex < 3.5) col *= vec3(0.3, 1.0, 0.4);
  else if (v_spriteIndex < 4.5) col *= vec3(0.8, 0.3, 1.0);
  else col *= vec3(1.0, 0.3, 0.3);

  fragColor = vec4(col, v_alpha);
}
