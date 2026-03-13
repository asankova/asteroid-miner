## ADDED Requirements

### Requirement: Five-Stage State Machine
The awakening sequence SHALL be a five-stage state machine (Stage 0–4) with one-way transitions. Stage transitions SHALL occur when the dormancy counter crosses defined thresholds: Stage 1 at 10, Stage 2 at 30, Stage 3 at 50, Stage 4 at 75. Stage 0 is the initial state.

#### Scenario: Stage 1 transition
- **WHEN** dormancy counter reaches 10.0
- **THEN** awakening state transitions to Stage 1 and a Stage 1 event fires

### Requirement: Stage-Specific Manifestations
Each stage SHALL activate distinct game effects:
- Stage 1: Signal patterns become non-random; recursive elements appear in decoded signals
- Stage 2: Architect constructs become visible on Tier 3 scan; geometric cold masses at field edge
- Stage 3: Robot equipment in nearby sectors malfunctions with 5% probability per hour
- Stage 4: Architect entities become visible in the field; they observe but do not act

#### Scenario: Stage 3 malfunction
- **WHEN** awakening is at Stage 3
- **THEN** robots within 1000 units of an X-type asteroid have a 5% per hour chance of equipment malfunction

### Requirement: Inter-Stage Variance Events
Between stage thresholds, the awakening sequence SHALL emit random low-intensity variance events to maintain tension: anomalous temperature readings, brief signal bursts, unexplained robot navigation deviations. Frequency: 1 per 5–15 minutes.

#### Scenario: Variance event frequency
- **WHEN** awakening is between Stage 1 and Stage 2
- **THEN** a variance event fires every 5–15 minutes (uniformly random interval)
