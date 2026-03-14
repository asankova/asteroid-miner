export enum MaterialTier { RAW = 0, REFINED = 1, ADVANCED = 2 }

export enum Material {
  // Tier 0 — Raw ores
  IRON_ORE = 'IRON_ORE',
  NICKEL_ORE = 'NICKEL_ORE',
  PLATINUM_ORE = 'PLATINUM_ORE',
  WATER_ICE = 'WATER_ICE',
  SILICATE_DUST = 'SILICATE_DUST',
  XENOMINERAL = 'XENOMINERAL',

  // Tier 1 — Refined
  IRON_BAR = 'IRON_BAR',
  NICKEL_ALLOY = 'NICKEL_ALLOY',
  PLATINUM_INGOT = 'PLATINUM_INGOT',
  COOLANT = 'COOLANT',
  CERAMIC_PLATE = 'CERAMIC_PLATE',
  RESONITE_SHARD = 'RESONITE_SHARD',

  // Tier 2 — Advanced
  CIRCUIT_BOARD = 'CIRCUIT_BOARD',
  MEMORY_CRYSTAL = 'MEMORY_CRYSTAL',
  FUSION_CELL = 'FUSION_CELL',
  NANO_COMPOSITE = 'NANO_COMPOSITE',
  ARCHITE_LENS = 'ARCHITE_LENS',
}

export interface MaterialData {
  material: Material
  tier: MaterialTier
  displayName: string
  stackSize: number
}

export const MATERIAL_DATA: Record<Material, MaterialData> = {
  [Material.IRON_ORE]:      { material: Material.IRON_ORE,      tier: MaterialTier.RAW,      displayName: 'Iron Ore',       stackSize: 100 },
  [Material.NICKEL_ORE]:    { material: Material.NICKEL_ORE,    tier: MaterialTier.RAW,      displayName: 'Nickel Ore',     stackSize: 100 },
  [Material.PLATINUM_ORE]:  { material: Material.PLATINUM_ORE,  tier: MaterialTier.RAW,      displayName: 'Platinum Ore',   stackSize: 50  },
  [Material.WATER_ICE]:     { material: Material.WATER_ICE,     tier: MaterialTier.RAW,      displayName: 'Water Ice',      stackSize: 80  },
  [Material.SILICATE_DUST]: { material: Material.SILICATE_DUST, tier: MaterialTier.RAW,      displayName: 'Silicate Dust',  stackSize: 100 },
  [Material.XENOMINERAL]:   { material: Material.XENOMINERAL,   tier: MaterialTier.RAW,      displayName: 'Xenomineral',    stackSize: 10  },
  [Material.IRON_BAR]:      { material: Material.IRON_BAR,      tier: MaterialTier.REFINED,  displayName: 'Iron Bar',       stackSize: 50  },
  [Material.NICKEL_ALLOY]:  { material: Material.NICKEL_ALLOY,  tier: MaterialTier.REFINED,  displayName: 'Nickel Alloy',   stackSize: 50  },
  [Material.PLATINUM_INGOT]:{ material: Material.PLATINUM_INGOT,tier: MaterialTier.REFINED,  displayName: 'Platinum Ingot', stackSize: 25  },
  [Material.COOLANT]:       { material: Material.COOLANT,       tier: MaterialTier.REFINED,  displayName: 'Coolant',        stackSize: 40  },
  [Material.CERAMIC_PLATE]: { material: Material.CERAMIC_PLATE, tier: MaterialTier.REFINED,  displayName: 'Ceramic Plate',  stackSize: 40  },
  [Material.RESONITE_SHARD]:{ material: Material.RESONITE_SHARD,tier: MaterialTier.REFINED,  displayName: 'Resonite Shard', stackSize: 10  },
  [Material.CIRCUIT_BOARD]: { material: Material.CIRCUIT_BOARD, tier: MaterialTier.ADVANCED, displayName: 'Circuit Board',  stackSize: 20  },
  [Material.MEMORY_CRYSTAL]:{ material: Material.MEMORY_CRYSTAL,tier: MaterialTier.ADVANCED, displayName: 'Memory Crystal', stackSize: 10  },
  [Material.FUSION_CELL]:   { material: Material.FUSION_CELL,   tier: MaterialTier.ADVANCED, displayName: 'Fusion Cell',    stackSize: 10  },
  [Material.NANO_COMPOSITE]:{ material: Material.NANO_COMPOSITE,tier: MaterialTier.ADVANCED, displayName: 'Nano-Composite', stackSize: 15  },
  [Material.ARCHITE_LENS]:  { material: Material.ARCHITE_LENS,  tier: MaterialTier.ADVANCED, displayName: 'Archite Lens',   stackSize: 5   },
}

export interface MaterialStack {
  material: Material
  quantity: number
}
