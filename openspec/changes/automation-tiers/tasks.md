## 1. Tier State Machine

- [ ] 1.1 Define AutomationTier enum (T0–T5) with prerequisite condition tables
- [ ] 1.2 Implement tier transition validation and explicit player activation flow
- [ ] 1.3 Implement activation confirmation dialog with capability change summary
- [ ] 1.4 Implement T1 rule engine: data-driven if/then rule evaluation at 1Hz

## 2. Production Planner (T2)

- [ ] 2.1 Implement recipe graph traversal to compute required robot assignments for target output rate
- [ ] 2.2 Implement demand signal propagation: desired output → required inputs → robot needs
- [ ] 2.3 Implement AUTOMATION-sourced task enqueue to task queue
- [ ] 2.4 Expose plan state (target vs actual rates, robot assignments) for UI consumption

## 3. Coordinator Agent (T3)

- [ ] 3.1 Implement multi-sector resource pool with allocation tracking
- [ ] 3.2 Implement conflict detection when multiple planners request same robot pool
- [ ] 3.3 Implement proportional allocation algorithm with sector priority weighting
- [ ] 3.4 Implement decision logging with structured rationale

## 4. Expansion Planner (T4)

- [ ] 4.1 Implement autonomous Scout dispatch logic for unsurveyed asteroids
- [ ] 4.2 Implement survey result evaluation against configurable resource thresholds
- [ ] 4.3 Implement expansion proposal notification to player event feed
- [ ] 4.4 Wire expansion decisions to strategy agent context window at T5

## 5. Automation Depth Display

- [ ] 5.1 Instrument task queue to count player vs automation task completions per 60s window
- [ ] 5.2 Implement rolling ratio computation and percentage bar data binding
- [ ] 5.3 Implement tier context label from global tier state
- [ ] 5.4 Wire display to HUD bottom-right panel
