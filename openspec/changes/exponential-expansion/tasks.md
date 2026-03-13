## 1. Replicator Unit

- [ ] 1.1 Add Replicator to robot entity type enum with self-fabrication capability flag
- [ ] 1.2 Implement 180s fabrication task with resource consumption on start
- [ ] 1.3 Implement fabrication pause/resume on material shortage
- [ ] 1.4 Gate Replicator unlock behind Memory Crystal production (Xenomineralogy T2)
- [ ] 1.5 Implement entity count cap at 10,000 with swarm aggregation fallback

## 2. Growth Dashboard

- [ ] 2.1 Implement log-scale entity count chart with 60-minute rolling history
- [ ] 2.2 Implement linear view toggle for J-curve display
- [ ] 2.3 Implement 10-minute rolling window doubling time calculator
- [ ] 2.4 Implement 60-second saturation projection based on current growth rate
- [ ] 2.5 Implement growth replay time-lapse (store snapshots every 5 minutes)

## 3. Carrying Capacity

- [ ] 3.1 Implement per-asteroid extraction saturation tracker
- [ ] 3.2 Implement global saturation computation (mean across mined asteroids)
- [ ] 3.3 Implement yield saturation modifier: 1 - 0.7 × saturation²
- [ ] 3.4 Implement saturation curve display with current position marker

## 4. Frontier Expansion

- [ ] 4.1 Implement saturation threshold monitor (>60% triggers expansion proposal)
- [ ] 4.2 Implement Architect agent expansion proposal generation
- [ ] 4.3 Implement expansion probe launch via Launch Rail with new sector initialization
- [ ] 4.4 Implement new sector asteroid field generation from seed

## 5. Cascade Events

- [ ] 5.1 Implement cascade event trigger at fixed robot count thresholds (50, 100, 200, 500, 1000)
- [ ] 5.2 Implement three cascade types (POWER_SURGE, COORDINATION_STORM, FABRICATION_HALT) with durations
- [ ] 5.3 Implement 50% growth rate reduction for cascade duration
- [ ] 5.4 Implement visual effects for each cascade type (arc sprites, storm particles, halt flash)
