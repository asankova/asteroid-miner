import { createProgram } from './ShaderUtils.ts'
import type { CameraController } from './CameraController.ts'

// Import shaders as raw strings via Vite ?raw
import particleVertSrc from './shaders/particle.vert.glsl?raw'
import particleFrag from './shaders/particle.frag.glsl?raw'
import particleRenderVert from './shaders/particle_render.vert.glsl?raw'

// Particle layout: position(2) velocity(2) lifetime(1) maxLifetime(1) size(1) category(1) = 8 floats
const FLOATS_PER_PARTICLE = 8
const MAX_PARTICLES = 50_000 // moderate default; bump for high-end GPUs

export class ParticleSystem {
  private gl: WebGL2RenderingContext
  private updateProgram!: WebGLProgram
  private renderProgram!: WebGLProgram
  private buffers: [WebGLBuffer, WebGLBuffer]
  private vaos: [WebGLVertexArrayObject, WebGLVertexArrayObject]
  private renderVAOs: [WebGLVertexArrayObject, WebGLVertexArrayObject]
  private tf: WebGLTransformFeedback
  private current = 0
  private count = MAX_PARTICLES
  private data: Float32Array

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
    this.data = new Float32Array(MAX_PARTICLES * FLOATS_PER_PARTICLE)
    this.buffers = [gl.createBuffer()!, gl.createBuffer()!]
    this.vaos = [gl.createVertexArray()!, gl.createVertexArray()!]
    this.renderVAOs = [gl.createVertexArray()!, gl.createVertexArray()!]
    this.tf = gl.createTransformFeedback()!

    this.initPrograms()
    this.initBuffers()
    this.seedParticles()
  }

  private initPrograms(): void {
    const gl = this.gl
    this.updateProgram = createProgram(gl, particleVertSrc, particleFrag,
      ['v_position', 'v_velocity', 'v_lifetime', 'v_maxLifetime', 'v_size', 'v_category'])
    this.renderProgram = createProgram(gl, particleRenderVert, particleFrag)
  }

  private initBuffers(): void {
    const gl = this.gl
    const stride = FLOATS_PER_PARTICLE * 4
    for (let i = 0; i < 2; i++) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[i])
      gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_COPY)

      // Update VAO
      gl.bindVertexArray(this.vaos[i])
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[i])
      const up = this.updateProgram
      this.attrib(up, 'a_position',    2, stride, 0)
      this.attrib(up, 'a_velocity',    2, stride, 8)
      this.attrib(up, 'a_lifetime',    1, stride, 16)
      this.attrib(up, 'a_maxLifetime', 1, stride, 20)
      this.attrib(up, 'a_size',        1, stride, 24)
      this.attrib(up, 'a_category',    1, stride, 28)
      gl.bindVertexArray(null)

      // Render VAO
      gl.bindVertexArray(this.renderVAOs[i])
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[i])
      const rp = this.renderProgram
      this.attrib(rp, 'a_position',    2, stride, 0)
      this.attrib(rp, 'a_lifetime',    1, stride, 16)
      this.attrib(rp, 'a_maxLifetime', 1, stride, 20)
      this.attrib(rp, 'a_size',        1, stride, 24)
      this.attrib(rp, 'a_category',    1, stride, 28)
      gl.bindVertexArray(null)
    }
  }

  private attrib(prog: WebGLProgram, name: string, size: number, stride: number, offsetBytes: number): void {
    const gl = this.gl
    const loc = gl.getAttribLocation(prog, name)
    if (loc < 0) return
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offsetBytes)
  }

  private seedParticles(): void {
    // Seed particles spread across field with random positions/velocities
    const FIELD = 50_000
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const base = i * FLOATS_PER_PARTICLE
      this.data[base + 0] = Math.random() * FIELD    // x
      this.data[base + 1] = Math.random() * FIELD    // y
      this.data[base + 2] = (Math.random() - 0.5) * 5  // vx
      this.data[base + 3] = (Math.random() - 0.5) * 5  // vy
      this.data[base + 4] = Math.random() * 30       // lifetime (varied start)
      this.data[base + 5] = 20 + Math.random() * 40  // maxLifetime
      this.data[base + 6] = 1 + Math.random() * 3    // size
      this.data[base + 7] = Math.floor(Math.random() * 3) // category
    }
    const gl = this.gl
    for (const buf of this.buffers) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.data)
    }
  }

  update(deltaTime: number, fieldSize: number): void {
    const gl = this.gl
    const src = this.current
    const dst = 1 - src

    gl.useProgram(this.updateProgram)
    gl.uniform1f(gl.getUniformLocation(this.updateProgram, 'u_deltaTime'), deltaTime)
    gl.uniform2f(gl.getUniformLocation(this.updateProgram, 'u_fieldSize'), fieldSize, fieldSize)

    gl.bindVertexArray(this.vaos[src])
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.tf)
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, this.buffers[dst])

    gl.enable(gl.RASTERIZER_DISCARD)
    gl.beginTransformFeedback(gl.POINTS)
    gl.drawArrays(gl.POINTS, 0, this.count)
    gl.endTransformFeedback()
    gl.disable(gl.RASTERIZER_DISCARD)

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null)
    gl.bindVertexArray(null)

    this.current = dst
  }

  render(viewMatrix: Float32Array, _lodLevel: number): void {
    const gl = this.gl
    gl.useProgram(this.renderProgram)
    gl.uniformMatrix3fv(gl.getUniformLocation(this.renderProgram, 'u_viewMatrix'), false, viewMatrix)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)  // additive blend for particles

    gl.bindVertexArray(this.renderVAOs[this.current])
    gl.drawArrays(gl.POINTS, 0, this.count)
    gl.bindVertexArray(null)

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // restore
  }
}

// Suppress unused import warning for CameraController type
void (null as unknown as CameraController)
