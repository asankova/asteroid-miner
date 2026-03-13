## 1. Agent Entity and Tiers

- [ ] 1.1 Define StrategyAgent class with tier, context buffer, reasoning state, proposal queue
- [ ] 1.2 Implement Tier 1/2/3 context buffer sizes (50/500/5000 events)
- [ ] 1.3 Implement agent unlock gates tied to automation tier and Systems Integration research
- [ ] 1.4 Implement CP consumption per agent tier with pause on CP exhaustion

## 2. Decision Engine

- [ ] 2.1 Implement relevance scoring for context events (recency × type weight × decision relevance)
- [ ] 2.2 Author decision template banks (20+ templates per category: mining, routing, expansion, threat)
- [ ] 2.3 Implement template selection with diversity guarantee (track recently used templates)
- [ ] 2.4 Implement chain-of-thought trace generation (3–5 steps per decision)
- [ ] 2.5 Implement Tier 3 corpus injection slot reading from substrate-narrative NSM

## 3. Context Window UI

- [ ] 3.1 Implement scrollable context list with event type icons and relevance score bars
- [ ] 3.2 Implement top-10 relevance filter with "Show All" toggle
- [ ] 3.3 Implement 3-second reasoning highlight on decision completion
- [ ] 3.4 Implement pattern injection visual distinction (different background, no source tag)
- [ ] 3.5 Implement "Insufficient Compute" state overlay when agent is paused

## 4. Memory Decay

- [ ] 4.1 Implement exponential relevance decay (0.95^age_in_minutes per event)
- [ ] 4.2 Implement event removal when relevance drops below 0.01 threshold
- [ ] 4.3 Implement Reasoning Quality meter (mean relevance of top-10 items)
- [ ] 4.4 Implement quality warning at <0.5 mean relevance

## 5. Agent Disagreement

- [ ] 5.1 Implement cross-tier conflict detection (mutual exclusion on robots/asteroids/directions)
- [ ] 5.2 Implement CONFLICT event generation with both proposal descriptions
- [ ] 5.3 Implement choice card in event notification feed with dual approve buttons
- [ ] 5.4 Implement proposal rejection on player choice resolution
