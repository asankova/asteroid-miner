#version 300 es
precision mediump float;

in float v_typeIndex;
in float v_radius;
in vec2 v_localPos;
in float v_lodAlpha;

out vec4 fragColor;

vec3 asteroidColor(float t) {
  // C=dark grey, S=brownish, M=silver, V=greenish, D=reddish, H=icy blue, A=orange, X/UNKNOWN=deep purple
  if (t < 0.5) return vec3(0.25, 0.22, 0.20);      // C
  if (t < 1.5) return vec3(0.45, 0.35, 0.25);      // S
  if (t < 2.5) return vec3(0.72, 0.75, 0.78);      // M
  if (t < 3.5) return vec3(0.30, 0.50, 0.35);      // V
  if (t < 4.5) return vec3(0.55, 0.28, 0.22);      // D
  if (t < 5.5) return vec3(0.55, 0.70, 0.88);      // H
  if (t < 6.5) return vec3(0.75, 0.50, 0.20);      // A
  return vec3(0.35, 0.20, 0.55);                    // X / UNKNOWN
}

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;

  vec3 color = asteroidColor(v_typeIndex);

  // Simple shading: brighter center, darker edge, slight specular
  float light = 1.0 - dist * 1.2;
  vec3 lit = color * light + vec3(0.15) * pow(max(0.0, 0.5 - dist * 2.0), 2.0);

  // Edge glow slightly
  float edge = smoothstep(0.48, 0.5, dist);
  lit = mix(lit, color * 0.4, edge);

  fragColor = vec4(lit, v_lodAlpha * (1.0 - edge * 0.5));
}
