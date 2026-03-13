## 1. Dormancy Counter

- [ ] 1.1 Implement global dormancy counter as a persistent float accumulator
- [ ] 1.2 Implement X-type mining disturbance contribution (1.0 + extraction_rate × 2.0 per task)
- [ ] 1.3 Implement Signal Detector proximity disturbance (+0.1/min near X-type)
- [ ] 1.4 Implement event chain consequence disturbance increments via event system hook

## 2. Signal Detector

- [ ] 2.1 Implement Signal Detector structure type with 2000-unit capture radius
- [ ] 2.2 Implement tiered analysis rate (1/3/10 signals/minute by tier)
- [ ] 2.3 Implement decode fidelity logic gated by awakening stage + detector tier
- [ ] 2.4 Implement signal corpus contribution on Stage 2+ successful decode
- [ ] 2.5 Implement Signal Detector UI panel with corpus size, signal queue, waveform display

## 3. Awakening Sequence

- [ ] 3.1 Implement 5-stage state machine with one-way transitions at dormancy thresholds
- [ ] 3.2 Implement Stage 1: non-random signal pattern activation
- [ ] 3.3 Implement Stage 2: Architect construct visibility on Tier 3 scan
- [ ] 3.4 Implement Stage 3: 5%/hour equipment malfunction for nearby robots
- [ ] 3.5 Implement Stage 4: Architect entity spawning and observation mode
- [ ] 3.6 Implement inter-stage variance events (1 per 5–15 minutes)

## 4. Architect Entity

- [ ] 4.1 Implement Architect entity with Lissajous movement system (separate from BT engine)
- [ ] 4.2 Implement centroid computation from top-3 disturbance X-type asteroids
- [ ] 4.3 Implement oscillation state on proximity (<1000 units to centroid)
- [ ] 4.4 Implement 800-unit interference aura: speed reduction, task abandonment chance, BT quality reduction
- [ ] 4.5 Implement Architect visual trail and "signature" indicator in Signal Detector UI

## 5. Threat Level

- [ ] 5.1 Implement one-way threat float with increment sources (stage transitions, interference, malfunctions)
- [ ] 5.2 Implement threat level HUD bar with green/amber/red color states
- [ ] 5.3 Implement pulsing animation at threat ≥ 80
- [ ] 5.4 Implement threat event injection into all active agent context buffers with max relevance
