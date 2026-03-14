#version 300 es
precision mediump float;

in float v_typeIndex;
in float v_radius;
in vec2 v_localPos;
in float v_lodAlpha;
in float v_rotation;

out vec4 fragColor;

// Per-type base color
vec3 asteroidBaseColor(float t) {
  // C=dark charcoal, S=warm brown, M=silver-blue, V=moss-green,
  // D=rust-red, H=icy-blue, A=amber-orange, X/UNKNOWN=deep-purple
  if (t < 0.5) return vec3(0.22, 0.20, 0.18);  // C - carbon, very dark
  if (t < 1.5) return vec3(0.50, 0.36, 0.22);  // S - silicate, brownish
  if (t < 2.5) return vec3(0.65, 0.72, 0.82);  // M - metallic, blue-silver
  if (t < 3.5) return vec3(0.28, 0.52, 0.32);  // V - volcanic, green
  if (t < 4.5) return vec3(0.60, 0.25, 0.18);  // D - dark-red
  if (t < 5.5) return vec3(0.50, 0.70, 0.92);  // H - icy blue
  if (t < 6.5) return vec3(0.80, 0.52, 0.15);  // A - amber
  return vec3(0.40, 0.18, 0.58);               // X - deep purple
}

// Per-type accent color for surface detail
vec3 asteroidAccentColor(float t) {
  if (t < 0.5) return vec3(0.08, 0.07, 0.07);  // C - near-black
  if (t < 1.5) return vec3(0.70, 0.55, 0.30);  // S - sandy highlight
  if (t < 2.5) return vec3(0.90, 0.95, 1.00);  // M - bright metallic
  if (t < 3.5) return vec3(0.45, 0.72, 0.35);  // V - bright green
  if (t < 4.5) return vec3(0.80, 0.40, 0.20);  // D - orange-red
  if (t < 5.5) return vec3(0.80, 0.92, 1.00);  // H - bright ice
  if (t < 6.5) return vec3(1.00, 0.78, 0.30);  // A - bright orange
  return vec3(0.70, 0.40, 0.90);               // X - bright purple
}

// Simple hash-based pseudo-noise on [0,1)
float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;

  // Rotate point coord by asteroid rotation for oriented detail
  float cr = cos(v_rotation);
  float sr = sin(v_rotation);
  vec2 rotCoord = vec2(coord.x * cr - coord.y * sr, coord.x * sr + coord.y * cr);

  vec3 baseColor = asteroidBaseColor(v_typeIndex);
  vec3 accentColor = asteroidAccentColor(v_typeIndex);

  // Basic lighting: diffuse from upper-left light source
  vec2 lightDir = normalize(vec2(-0.6, -0.8));
  float diffuse = max(0.0, dot(-normalize(coord), lightDir));
  float light = 0.3 + 0.7 * diffuse;

  // Surface texture: craters/bands using rotated coordinates
  float band1 = smoothstep(0.04, 0.07, abs(fract(rotCoord.x * 4.0 + 0.5) - 0.5));
  float crater1 = smoothstep(0.12, 0.10, length(rotCoord - vec2(0.18, 0.08)));
  float crater2 = smoothstep(0.07, 0.05, length(rotCoord - vec2(-0.12, -0.18)));
  float crater3 = smoothstep(0.05, 0.04, length(rotCoord - vec2(0.08, -0.22)));

  // Metallic type (M) gets shiny bands instead of craters
  float isMetal = step(1.5, v_typeIndex) * step(v_typeIndex, 2.5);
  float metalBand = smoothstep(0.03, 0.05, abs(fract(rotCoord.y * 5.0 + 0.3) - 0.5));
  float metalBand2 = smoothstep(0.02, 0.04, abs(fract(rotCoord.x * 3.0 + 0.7) - 0.5));
  float metalDetail = mix(0.0, metalBand * metalBand2, isMetal);

  // Icy type (H) gets fracture lines
  float isIce = step(4.5, v_typeIndex) * step(v_typeIndex, 5.5);
  float fracture = smoothstep(0.01, 0.02, abs(fract(rotCoord.x * 2.5 + rotCoord.y * 1.5) - 0.5));
  float iceDetail = mix(0.0, fracture * 0.4, isIce);

  // Combine surface detail
  float craterDepth = (crater1 * 0.6 + crater2 * 0.5 + crater3 * 0.4) * (1.0 - isMetal);
  float surfaceDetail = mix(0.0, band1 * 0.15, 1.0 - isMetal) + metalDetail * 0.25 + iceDetail;

  // Final color: base + accent highlights + lighting
  vec3 col = mix(baseColor, accentColor, surfaceDetail);
  col = mix(col * 0.35, col, 1.0 - craterDepth * 0.6); // craters are darker
  col *= light;

  // Specular highlight (stronger on metallic)
  vec2 halfVec = normalize(lightDir + vec2(0.0, 0.0));
  float spec = pow(max(0.0, dot(-normalize(coord + vec2(0.05, 0.1)), lightDir)), 8.0);
  float specStrength = mix(0.08, 0.35, isMetal);
  col += accentColor * spec * specStrength;

  // Edge: dark rim
  float edge = smoothstep(0.40, 0.50, dist);
  col = mix(col, col * 0.2, edge);

  // Alpha: fade edge slightly, full opacity otherwise
  float alpha = v_lodAlpha * (1.0 - edge * 0.6);

  fragColor = vec4(col, alpha);
}
