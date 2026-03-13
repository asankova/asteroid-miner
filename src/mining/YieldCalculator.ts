import type { ToolProfile } from './MiningTool.ts'

export enum OreGrade { A = 'A', B = 'B', C = 'C', D = 'D' }

export interface YieldResult {
  yieldAmount: number
  duration: number
  energyCost: number
  oreGrade: OreGrade
  isRareYield: boolean
  rareMineral?: string
}

const HARDNESS: Record<string, number> = {
  C: 0.8, S: 1.0, M: 1.4, V: 0.7, D: 1.1,
  H: 0.9, A: 1.2, X: 1.6, UNKNOWN: 1.6,
}

const RARE_MINERALS: Record<string, string[]> = {
  X: ['xenomineral_alpha', 'xenomineral_beta', 'resonite', 'archite'],
  M: ['platinum_vein', 'iridium_cluster'],
  A: ['palladium_node'],
}

export class YieldCalculator {
  calculate(params: {
    concentration: number
    tool: ToolProfile
    robotSkill: number
    structuralIntegrity: number
    concurrentMiners: number
    asteroidType: string
  }): YieldResult {
    const { concentration, tool, robotSkill, structuralIntegrity, concurrentMiners, asteroidType } = params

    const compatMod = tool.compatibleTypes.includes(asteroidType) ? 1.0 : 0.5
    const integrityMod = Math.max(0.5, structuralIntegrity)
    const concurrentMod = 1 / (1 + 0.1 * Math.max(0, concurrentMiners - 1))

    const yieldAmount = Math.max(0, Math.min(1,
      concentration * tool.efficiency * robotSkill * integrityMod * compatMod * concurrentMod
    ))

    const hardness = HARDNESS[asteroidType] ?? 1.0
    const duration = hardness * tool.speed * 60

    const gradeScore = yieldAmount * tool.precision
    let oreGrade = OreGrade.D
    if (gradeScore >= 0.75) oreGrade = OreGrade.A
    else if (gradeScore >= 0.50) oreGrade = OreGrade.B
    else if (gradeScore >= 0.25) oreGrade = OreGrade.C

    const rareProbability = asteroidType === 'X' ? 0.05 : 0.001
    const isRareYield = Math.random() < rareProbability
    const pool = RARE_MINERALS[asteroidType] ?? ['trace_rare_earth']
    const rareMineral = isRareYield ? pool[Math.floor(Math.random() * pool.length)] : undefined

    return { yieldAmount, duration, energyCost: tool.energyCost, oreGrade, isRareYield, rareMineral }
  }
}
