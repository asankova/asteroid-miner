## 1. Structure Entity System

- [ ] 1.1 Define StructureType enum with 8 types and their stat profiles
- [ ] 1.2 Implement structure entity data model (health, tier, power, position, build state)
- [ ] 1.3 Implement placement validation (components, overlap, relay coverage)
- [ ] 1.4 Implement upgrade tier mechanics with component cost and stat scaling
- [ ] 1.5 Register structures with spatial hash grid on placement

## 2. Power Grid

- [ ] 2.1 Implement global power pool: sum generators, sum consumers each tick
- [ ] 2.2 Implement priority-class throttling on deficit
- [ ] 2.3 Implement pre-deficit warning at <20% safety margin
- [ ] 2.4 Expose generation/consumption values to HUD data API

## 3. Relay Network

- [ ] 3.1 Implement coverage map as a spatial set of covered positions (grid cells)
- [ ] 3.2 Implement coverage map recomputation on beacon placement/destruction/upgrade
- [ ] 3.3 Implement robot coordination bonus lookup from coverage map
- [ ] 3.4 Wire beacon coverage to relay-overlay in UI

## 4. Construction Pipeline

- [ ] 4.1 Implement 3-stage construction state machine per structure site
- [ ] 4.2 Implement Foundation (instant), Assembly (Builder task), Activation (Builder task) stages
- [ ] 4.3 Implement construction interruption with progress preservation
- [ ] 4.4 Implement component consumption on Assembly start (non-refundable)

## 5. Structure Maintenance

- [ ] 5.1 Implement per-structure health degradation at type-specific rates
- [ ] 5.2 Implement efficiency penalty scaling below 50% health
- [ ] 5.3 Implement STRUCTURE_FAILED event at 0% health with structure halt
- [ ] 5.4 Implement Repair Bay auto-scan and REPAIR task generation every 60s
- [ ] 5.5 Implement REPAIR task completion: +30% health restore
