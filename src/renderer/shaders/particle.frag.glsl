#version 300 es
precision mediump float;

in float v_lifetime;
in float v_maxLifetime;
in float v_category;

out vec4 fragColor;

void main() {
  float lifeRatio = v_lifetime / v_maxLifetime;
  if (lifeRatio <= 0.0) discard;

  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;

  float alpha = lifeRatio * (1.0 - dist * 2.0);

  vec3 color;
  if (v_category < 0.5) color = vec3(0.6, 0.55, 0.5);      // dust: grey
  else if (v_category < 1.5) color = vec3(1.0, 0.95, 0.7); // glint: warm white
  else color = vec3(0.7, 0.6, 0.5);                         // fragment: rocky

  fragColor = vec4(color, alpha * 0.6);
}
