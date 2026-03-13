## 1. Data Model and Loading

- [ ] 1.1 Define research node schema (YAML format) with all required fields
- [ ] 1.2 Author 60+ research nodes across 5 branches in research-tree.yaml
- [ ] 1.3 Implement YAML loader with DAG validation (cycle detection, missing refs, dup IDs)
- [ ] 1.4 Implement reward payload union types for all 6 reward categories

## 2. Research Queue

- [ ] 2.1 Implement research queue with max-5 enforcement and prerequisite validation
- [ ] 2.2 Implement RP accumulation on active item per tick
- [ ] 2.3 Implement queue reordering with immediate active item update
- [ ] 2.4 Implement node completion: apply reward payload to appropriate subsystem

## 3. RP Generation

- [ ] 3.1 Implement Scout robot SURVEY task → 2 RP/min accumulation in simulation worker
- [ ] 3.2 Implement Science Lab structure → RP/min by tier in simulation worker
- [ ] 3.3 Implement anomaly discovery → 500 RP one-time bonus listener
- [ ] 3.4 Expose RP/s rate for queue ETA display

## 4. Discovery Unlocks

- [ ] 4.1 Implement global flag registry as a key→boolean map, persisted in save state
- [ ] 4.2 Implement flag-set event listener that re-evaluates DISCOVERY node availability
- [ ] 4.3 Wire RARE_YIELD event → flag set → Xenomineralogy unlock trigger
- [ ] 4.4 Wire event chain consequences → flag sets for other discovery nodes

## 5. Rushed Research

- [ ] 5.1 Implement rushed mode toggle on queue item (50% cost, 20% failure)
- [ ] 5.2 Implement partial failure: random active structure enters MALFUNCTION for 120s
- [ ] 5.3 Show rushed mode indicator in research queue UI with risk warning
