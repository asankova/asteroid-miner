#version 300 es
in vec2 a_position;
in float a_lifetime;
in float a_maxLifetime;
in float a_size;
in float a_category;

uniform mat3 u_viewMatrix;

out float v_lifetime;
out float v_maxLifetime;
out float v_category;

void main() {
  float lifeRatio = a_lifetime / a_maxLifetime;
  if (lifeRatio <= 0.0) {
    gl_Position = vec4(2.0, 2.0, 0.0, 1.0); // clip
    gl_PointSize = 0.0;
    return;
  }

  vec3 clip = u_viewMatrix * vec3(a_position, 1.0);
  gl_Position = vec4(clip.xy, 0.0, 1.0);
  gl_PointSize = max(a_size * abs(u_viewMatrix[0][0]), 1.0);

  v_lifetime = a_lifetime;
  v_maxLifetime = a_maxLifetime;
  v_category = a_category;
}
