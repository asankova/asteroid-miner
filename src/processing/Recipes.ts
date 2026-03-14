import { Material } from './Materials.ts'

export enum ProcessingStructureType {
  ORE_SMELTER = 'ORE_SMELTER',
  REFINERY = 'REFINERY',
  CRYO_PROCESSOR = 'CRYO_PROCESSOR',
  MOLECULAR_ASSEMBLER = 'MOLECULAR_ASSEMBLER',
}

export interface Recipe {
  id: string
  structureType: ProcessingStructureType
  inputs: Array<{ material: Material; quantity: number }>
  outputs: Array<{ material: Material; quantity: number }>
  processingTime: number // seconds
  powerRequired: number // kW
}

export const RECIPES: Recipe[] = [
  // Ore Smelter
  { id: 'smelt_iron',     structureType: ProcessingStructureType.ORE_SMELTER,       processingTime: 10, powerRequired: 20, inputs: [{ material: Material.IRON_ORE, quantity: 3 }],     outputs: [{ material: Material.IRON_BAR, quantity: 2 }] },
  { id: 'smelt_nickel',   structureType: ProcessingStructureType.ORE_SMELTER,       processingTime: 12, powerRequired: 20, inputs: [{ material: Material.NICKEL_ORE, quantity: 3 }],   outputs: [{ material: Material.NICKEL_ALLOY, quantity: 2 }] },
  { id: 'smelt_platinum', structureType: ProcessingStructureType.ORE_SMELTER,       processingTime: 20, powerRequired: 30, inputs: [{ material: Material.PLATINUM_ORE, quantity: 2 }], outputs: [{ material: Material.PLATINUM_INGOT, quantity: 1 }] },
  // Refinery
  { id: 'refine_ceramic', structureType: ProcessingStructureType.REFINERY,          processingTime: 15, powerRequired: 25, inputs: [{ material: Material.SILICATE_DUST, quantity: 4 }], outputs: [{ material: Material.CERAMIC_PLATE, quantity: 2 }] },
  { id: 'refine_resonite',structureType: ProcessingStructureType.REFINERY,          processingTime: 30, powerRequired: 25, inputs: [{ material: Material.XENOMINERAL, quantity: 1 }],   outputs: [{ material: Material.RESONITE_SHARD, quantity: 2 }] },
  // Cryo Processor
  { id: 'cryo_coolant',   structureType: ProcessingStructureType.CRYO_PROCESSOR,    processingTime: 8,  powerRequired: 35, inputs: [{ material: Material.WATER_ICE, quantity: 2 }],     outputs: [{ material: Material.COOLANT, quantity: 3 }] },
  // Molecular Assembler
  { id: 'assemble_circuit',structureType: ProcessingStructureType.MOLECULAR_ASSEMBLER, processingTime: 45, powerRequired: 50, inputs: [{ material: Material.IRON_BAR, quantity: 2 }, { material: Material.PLATINUM_INGOT, quantity: 1 }], outputs: [{ material: Material.CIRCUIT_BOARD, quantity: 1 }] },
  { id: 'assemble_memory', structureType: ProcessingStructureType.MOLECULAR_ASSEMBLER, processingTime: 60, powerRequired: 60, inputs: [{ material: Material.RESONITE_SHARD, quantity: 2 }, { material: Material.PLATINUM_INGOT, quantity: 1 }], outputs: [{ material: Material.MEMORY_CRYSTAL, quantity: 1 }] },
  { id: 'assemble_fusion', structureType: ProcessingStructureType.MOLECULAR_ASSEMBLER, processingTime: 90, powerRequired: 80, inputs: [{ material: Material.NICKEL_ALLOY, quantity: 3 }, { material: Material.COOLANT, quantity: 2 }], outputs: [{ material: Material.FUSION_CELL, quantity: 1 }] },
  { id: 'assemble_nano',   structureType: ProcessingStructureType.MOLECULAR_ASSEMBLER, processingTime: 50, powerRequired: 55, inputs: [{ material: Material.CERAMIC_PLATE, quantity: 2 }, { material: Material.IRON_BAR, quantity: 2 }], outputs: [{ material: Material.NANO_COMPOSITE, quantity: 1 }] },
]

export function getRecipesForStructure(type: ProcessingStructureType): Recipe[] {
  return RECIPES.filter(r => r.structureType === type)
}
