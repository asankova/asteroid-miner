#version 300 es
in vec2 a_position;
in float a_radius;
in float a_typeIndex;
in float a_rotation;

uniform mat3 u_viewMatrix;
uniform float u_lodAlpha;

out float v_typeIndex;
out float v_radius;
out vec2 v_localPos;
out float v_lodAlpha;

void main() {
  v_typeIndex = a_typeIndex;
  v_radius = a_radius;
  v_lodAlpha = u_lodAlpha;
  vec3 worldPos = u_viewMatrix * vec3(a_position, 1.0);
  v_localPos = a_position;
  gl_Position = vec4(worldPos.xy, 0.0, 1.0);
  gl_PointSize = max(a_radius * 2.0 * abs(u_viewMatrix[0][0]), 2.0);
}
