#version 300 es
in vec2 a_position;
in vec2 a_velocity;
in float a_lifetime;
in float a_maxLifetime;
in float a_size;
in float a_category; // 0=dust, 1=glint, 2=fragment

uniform float u_deltaTime;
uniform vec2 u_fieldSize;

out vec2 v_position;
out vec2 v_velocity;
out float v_lifetime;
out float v_maxLifetime;
out float v_size;
out float v_category;

void main() {
  float newLifetime = a_lifetime - u_deltaTime;
  vec2 newPos = a_position + a_velocity * u_deltaTime;

  // Wrap within field
  newPos = mod(newPos, u_fieldSize);

  v_position = newPos;
  v_velocity = a_velocity * 0.999; // slight drag
  v_lifetime = newLifetime;
  v_maxLifetime = a_maxLifetime;
  v_size = a_size;
  v_category = a_category;

  gl_Position = vec4(0.0); // not used in TF pass
}
