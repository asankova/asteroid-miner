## 1. Event Data Format

- [ ] 1.1 Define event YAML schema (id, category, one-shot, condition, body, choices, consequences)
- [ ] 1.2 Implement YAML event loader with validation (required fields, valid consequence types)
- [ ] 1.3 Implement event chain definition format in YAML with step/branch structure
- [ ] 1.4 Validate chain graphs at load: detect unreachable steps and dangling references

## 2. Event Engine

- [ ] 2.1 Implement DSL condition expression parser (support: AND/OR/NOT, comparisons, flag.X, event.X)
- [ ] 2.2 Implement 1Hz condition evaluation loop with one-shot skip logic
- [ ] 2.3 Implement 120-second global cooldown with event queue
- [ ] 2.4 Implement repeatable event min_interval enforcement

## 3. Event Card UI

- [ ] 3.1 Implement event card modal with title, category icon, body, and choice buttons
- [ ] 3.2 Implement consequence tooltip on choice button hover
- [ ] 3.3 Implement card dismiss on choice selection
- [ ] 3.4 Implement card animation: slide-in from right

## 4. Consequence Engine

- [ ] 4.1 Implement all 7 consequence type processors
- [ ] 4.2 Implement sequential consequence processing on choice selection
- [ ] 4.3 Wire SET_FLAG → flag registry, ADD_RP → research accumulator, MODIFY_THREAT → threat level
- [ ] 4.4 Wire INJECT_CORPUS → signal corpus, CHAIN_ADVANCE → chain state

## 5. Event Log

- [ ] 5.1 Implement append-only event log with timestamp, category, title, choice
- [ ] 5.2 Implement event log panel UI with scrollable list and expandable entries
- [ ] 5.3 Persist event log and chain state in save file

## 6. Event Content

- [ ] 6.1 Author 8 Geological events (asteroid formation anomalies, unusual ore geometries)
- [ ] 6.2 Author 5 Technical events (unexpected automation behaviors, robot coordinate singularities)
- [ ] 6.3 Author 4 Historical events (data recovered from pre-existing derelict structures)
- [ ] 6.4 Author 6 First Contact events (2 per awakening stage 1-3, seeded for pacing)
- [ ] 6.5 Author 4 Philosophical events (unlocked by Tier 2+ agent activity)
- [ ] 6.6 Author 2 event chains: "The Architects" (6-step First Contact chain) and "The Equipment That Learned" (4-step Technical/Philosophical chain)
