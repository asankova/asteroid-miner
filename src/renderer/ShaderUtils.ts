export function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error:\n${log}\n\nSource:\n${source}`)
  }
  return shader
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vertSrc: string,
  fragSrc: string,
  transformFeedbackVaryings?: string[]
): WebGLProgram {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc)
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  const prog = gl.createProgram()!
  gl.attachShader(prog, vert)
  gl.attachShader(prog, frag)
  if (transformFeedbackVaryings) {
    gl.transformFeedbackVaryings(prog, transformFeedbackVaryings, gl.INTERLEAVED_ATTRIBS)
  }
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog)
    throw new Error(`Program link error: ${log}`)
  }
  gl.deleteShader(vert)
  gl.deleteShader(frag)
  return prog
}
