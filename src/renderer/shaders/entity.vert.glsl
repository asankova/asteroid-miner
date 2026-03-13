#version 300 es
// Per-vertex (unit quad -0.5..0.5)
in vec2 a_vertex;

// Per-instance (8 floats)
in vec2 a_pos;        // world x,y
in float a_scale;
in float a_rotation;
in float a_spriteIndex;
in float a_colorR;
in float a_colorG;
in float a_alpha;

uniform mat3 u_viewMatrix;

out float v_spriteIndex;
out vec3 v_color;
out float v_alpha;
out vec2 v_uv;

void main() {
  float c = cos(a_rotation);
  float s = sin(a_rotation);
  mat2 rot = mat2(c, s, -s, c);

  vec2 local = rot * (a_vertex * a_scale);
  vec3 world = u_viewMatrix * vec3(a_pos + local, 1.0);

  v_spriteIndex = a_spriteIndex;
  v_color = vec3(a_colorR, a_colorG, 0.7);
  v_alpha = a_alpha;
  v_uv = a_vertex + 0.5;

  gl_Position = vec4(world.xy, 0.0, 1.0);
}
