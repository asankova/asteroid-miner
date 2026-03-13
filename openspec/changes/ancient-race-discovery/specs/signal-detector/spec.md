## ADDED Requirements

### Requirement: Signal Capture Structure
The Signal Detector SHALL be a placeable structure that captures ambient electromagnetic signals within a 2000 world-unit radius. Captured signals are queued for analysis. Analysis rate depends on upgrade tier: Tier 1=1 signal/minute, Tier 2=3 signals/minute, Tier 3=10 signals/minute.

#### Scenario: Signal capture rate
- **WHEN** a Tier 2 Signal Detector is placed near multiple X-type asteroids
- **THEN** it processes 3 signals per minute from the captured signal queue

### Requirement: Tiered Decode Fidelity
Signal decode output SHALL depend on awakening stage and Signal Detector tier. At Stage 0, all signals decode as noise. At Stage 1+, Tier 1 detectors show partial patterns; Tier 3 detectors with Xenomineralogy T2 research show structural regularities. Full decode is never achieved by Signal Detector alone.

#### Scenario: Stage 0 decode output
- **WHEN** awakening is at Stage 0 and a signal is analyzed
- **THEN** the decoded output is displayed as a noise waveform with no identifiable structure

#### Scenario: Stage 2 Tier 3 decode
- **WHEN** awakening is at Stage 2 and a Tier 3 Signal Detector analyzes a signal
- **THEN** the decoded output shows recursive structural patterns that feed the signal corpus

### Requirement: Corpus Contribution
Successfully decoded signals at Stage 2+ SHALL contribute pattern entries to the substrate-narrative signal corpus. Corpus size SHALL be displayed in the Signal Detector UI panel.

#### Scenario: Corpus contribution
- **WHEN** a signal is successfully decoded at Stage 2
- **THEN** one pattern entry is added to the signal corpus and the corpus size count increments
