import { createProgram } from './ShaderUtils.ts'
import type { AsteroidData } from '../types/index.ts'
import { AsteroidType } from '../types/index.ts'
import type { SpatialHash } from './SpatialHash.ts'

import worldVertSrc from './shaders/world.vert.glsl?raw'
import worldFragSrc from './shaders/world.frag.glsl?raw'

const TYPE_INDEX: Record<AsteroidType, number> = {
  [AsteroidType.C]: 0, [AsteroidType.S]: 1, [AsteroidType.M]: 2,
  [AsteroidType.V]: 3, [AsteroidType.D]: 4, [AsteroidType.H]: 5,
  [AsteroidType.A]: 6, [AsteroidType.X]: 7, [AsteroidType.UNKNOWN]: 7,
}

// Buffer layout per asteroid: x, y, radius, typeIndex, rotation = 5 floats
const FLOATS_PER_ASTEROID = 5
const MAX_ASTEROIDS = 10_000

export class WorldRenderer {
  private gl: WebGL2RenderingContext
  private program!: WebGLProgram
  private vao!: WebGLVertexArrayObject
  private buffer!: WebGLBuffer
  private data = new Float32Array(MAX_ASTEROIDS * FLOATS_PER_ASTEROID)
  private count = 0

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
    this.init()
  }

  private init(): void {
    const gl = this.gl
    this.program = createProgram(gl, worldVertSrc, worldFragSrc)

    this.buffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW)

    this.vao = gl.createVertexArray()!
    gl.bindVertexArray(this.vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)

    const stride = FLOATS_PER_ASTEROID * 4
    const attrs = [
      { name: 'a_position', size: 2, offset: 0 },
      { name: 'a_radius',   size: 1, offset: 8 },
      { name: 'a_typeIndex',size: 1, offset: 12 },
      { name: 'a_rotation', size: 1, offset: 16 },
    ]
    for (const a of attrs) {
      const loc = gl.getAttribLocation(this.program, a.name)
      if (loc >= 0) {
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, a.size, gl.FLOAT, false, stride, a.offset)
      }
    }
    gl.bindVertexArray(null)
  }

  updateFromField(
    asteroids: AsteroidData[],
    spatialHash: SpatialHash<AsteroidData>,
    viewport: { x: number; y: number; w: number; h: number }
  ): void {
    // Frustum cull: only include asteroids in viewport (padded)
    const pad = 500
    const visible = spatialHash.query(
      viewport.x - pad, viewport.y - pad,
      viewport.w + pad * 2, viewport.h + pad * 2
    )

    this.count = Math.min(visible.length, MAX_ASTEROIDS)
    for (let i = 0; i < this.count; i++) {
      const a = visible[i]
      const base = i * FLOATS_PER_ASTEROID
      this.data[base + 0] = a.x
      this.data[base + 1] = a.y
      this.data[base + 2] = a.radius
      this.data[base + 3] = TYPE_INDEX[a.visualType]
      this.data[base + 4] = a.rotation
    }

    const gl = this.gl
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.data.subarray(0, this.count * FLOATS_PER_ASTEROID))
    // suppress unused warning
    void asteroids
  }

  render(viewMatrix: Float32Array, lodAlpha: number, zoom: number): void {
    if (this.count === 0) return
    const gl = this.gl

    gl.useProgram(this.program)
    gl.uniformMatrix3fv(gl.getUniformLocation(this.program, 'u_viewMatrix'), false, viewMatrix)
    gl.uniform1f(gl.getUniformLocation(this.program, 'u_lodAlpha'), lodAlpha)
    gl.uniform1f(gl.getUniformLocation(this.program, 'u_zoom'), zoom)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    gl.bindVertexArray(this.vao)
    gl.drawArrays(gl.POINTS, 0, this.count)
    gl.bindVertexArray(null)
  }
}
