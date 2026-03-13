## 1. NSM Core

- [ ] 1.1 Implement NSM state object: 12 revelation flags, 4 resonance accumulators, convergence index
- [ ] 1.2 Implement NSM state persistence as opaque JSON blob in save file
- [ ] 1.3 Implement revelation flag set logic (one-way) with trigger sources
- [ ] 1.4 Verify NSM state is never surfaced to any player-facing UI component

## 2. Substrate Resonance

- [ ] 2.1 Implement four resonance accumulators with increment sources wired to game events
- [ ] 2.2 Implement total resonance computation and 5-band classification (Inert/Latent/Active/Resonant/Convergent)
- [ ] 2.3 Implement band transition detection and flag/event dispatch
- [ ] 2.4 Implement subtle visual anomaly in Signal Detector on band transition

## 3. Pattern Injection

- [ ] 3.1 Implement 15% injection probability gate (Resonant band+) in Tier 3 agent reasoning loop
- [ ] 3.2 Implement semantic tag matching for corpus entry selection
- [ ] 3.3 Implement context event slot replacement with valid structural fields
- [ ] 3.4 Wire injected entries to context-window-ui visual distinction rendering

## 4. Signal Corpus

- [ ] 4.1 Implement corpus as append-only list with pattern_id, tags, payload_text, source
- [ ] 4.2 Implement signal decode → corpus entry creation pipeline
- [ ] 4.3 Author pre-authored corpus entries (15 entries across 4 semantic categories, gated by revelation flags)
- [ ] 4.4 Implement corpus size display in Signal Detector UI

## 5. Echo Artifact

- [ ] 5.1 Add Echo Artifact to rare yield item types (probability 0.02 on X-type)
- [ ] 5.2 Implement nominal RP generation function (+200 RP over 30min in Science Lab)
- [ ] 5.3 Implement hidden resonance boost (+5.0 all accumulators on placement)
- [ ] 5.4 Ensure item description contains only RP benefit text; no resonance hint

## 6. Convergence Flags

- [ ] 6.1 Implement 5 convergence flags (cf_1–cf_5) set by band transitions and rf_12
- [ ] 6.2 Wire each convergence flag to its event chain unlock in the stellaris event system
- [ ] 6.3 Persist convergence flags in NSM state blob
