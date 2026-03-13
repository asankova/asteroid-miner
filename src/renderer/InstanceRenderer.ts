import { createProgram } from './ShaderUtils.ts'
import type { RobotData } from '../types/index.ts'
import { RobotType } from '../types/index.ts'

import entityVertSrc from './shaders/entity.vert.glsl?raw'
import entityFragSrc from './shaders/entity.frag.glsl?raw'

// Instance layout: x(1) y(1) scale(1) rotation(1) spriteIndex(1) colorR(1) colorG(1) alpha(1) = 8 floats
const FLOATS_PER_INSTANCE = 8
const MAX_INSTANCES = 10_000

const ROBOT_SPRITE_INDEX: Record<RobotType, number> = {
  [RobotType.SCOUT]: 0,
  [RobotType.MINER]: 1,
  [RobotType.HAULER]: 2,
  [RobotType.BUILDER]: 3,
  [RobotType.FABRICATOR]: 4,
  [RobotType.SENTINEL]: 5,
}

export class InstanceRenderer {
  private gl: WebGL2RenderingContext
  private program!: WebGLProgram
  private vao!: WebGLVertexArrayObject
  private instanceBuffer!: WebGLBuffer
  private quadBuffer!: WebGLBuffer
  private instanceData = new Float32Array(MAX_INSTANCES * FLOATS_PER_INSTANCE)
  private instanceCount = 0
  private dirty = false

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
    this.init()
  }

  private init(): void {
    const gl = this.gl
    this.program = createProgram(gl, entityVertSrc, entityFragSrc)

    // Unit quad vertices (-0.5 to 0.5)
    const quad = new Float32Array([
      -0.5, -0.5,
       0.5, -0.5,
      -0.5,  0.5,
       0.5,  0.5,
    ])

    this.quadBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)

    this.instanceBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.instanceData, gl.DYNAMIC_DRAW)

    this.vao = gl.createVertexArray()!
    gl.bindVertexArray(this.vao)

    // Per-vertex: a_vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
    const vertLoc = gl.getAttribLocation(this.program, 'a_vertex')
    gl.enableVertexAttribArray(vertLoc)
    gl.vertexAttribPointer(vertLoc, 2, gl.FLOAT, false, 0, 0)

    // Per-instance attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer)
    const stride = FLOATS_PER_INSTANCE * 4
    const attrs = ['a_pos', 'a_scale', 'a_rotation', 'a_spriteIndex', 'a_colorR', 'a_colorG', 'a_alpha']
    const sizes  = [2, 1, 1, 1, 1, 1, 1]
    let offset = 0
    for (let i = 0; i < attrs.length; i++) {
      const loc = gl.getAttribLocation(this.program, attrs[i])
      if (loc >= 0) {
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, sizes[i], gl.FLOAT, false, stride, offset)
        gl.vertexAttribDivisor(loc, 1) // advance per instance
      }
      offset += sizes[i] * 4
    }

    gl.bindVertexArray(null)
  }

  clear(): void {
    this.instanceCount = 0
    this.dirty = false
  }

  addRobot(robot: RobotData): void {
    if (this.instanceCount >= MAX_INSTANCES) return
    const base = this.instanceCount * FLOATS_PER_INSTANCE
    const d = this.instanceData
    // Interpolate position toward target for smooth movement
    const lerpT = 0.15
    const rx = robot.x + (robot.targetX - robot.x) * lerpT
    const ry = robot.y + (robot.targetY - robot.y) * lerpT
    d[base + 0] = rx
    d[base + 1] = ry
    d[base + 2] = 12  // scale in world units
    d[base + 3] = Math.atan2(robot.targetY - robot.y, robot.targetX - robot.x)
    d[base + 4] = ROBOT_SPRITE_INDEX[robot.type]
    d[base + 5] = 0.8  // colorR
    d[base + 6] = 0.8  // colorG
    d[base + 7] = robot.state === 'IDLE' ? 0.5 : 1.0
    this.instanceCount++
    this.dirty = true
  }

  render(viewMatrix: Float32Array, _lodLevel: number): void {
    if (this.instanceCount === 0) return
    const gl = this.gl

    gl.useProgram(this.program)
    gl.uniformMatrix3fv(gl.getUniformLocation(this.program, 'u_viewMatrix'), false, viewMatrix)

    if (this.dirty) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer)
      gl.bufferSubData(gl.ARRAY_BUFFER, 0,
        this.instanceData.subarray(0, this.instanceCount * FLOATS_PER_INSTANCE))
      this.dirty = false
    }

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    gl.bindVertexArray(this.vao)
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.instanceCount)
    gl.bindVertexArray(null)
  }
}
