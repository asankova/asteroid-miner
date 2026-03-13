## 1. Material System

- [ ] 1.1 Define material enum for all 18 material types across three tiers
- [ ] 1.2 Implement material data class with tier, display name, stack size, icon ref
- [ ] 1.3 Define processing recipes as a data file (JSON) with inputs, outputs, time, structure type
- [ ] 1.4 Implement recipe lookup by output material and available structure type

## 2. Processing Structures

- [ ] 2.1 Implement structure base class with input/output buffer, tick rate, power consumption
- [ ] 2.2 Implement Ore Smelter, Refinery, Cryogenic Processor, Molecular Assembler subclasses
- [ ] 2.3 Implement 1Hz processing tick loop in simulation worker
- [ ] 2.4 Implement power-deficit halt logic and POWER_DEFICIT event emission
- [ ] 2.5 Implement output buffer full blocking and idle state reporting

## 3. Pipeline Logistics

- [ ] 3.1 Implement hauler route data model (source, destination, trigger threshold, max haulers)
- [ ] 3.2 Implement cycle detection (DFS on structure dependency graph) at route creation
- [ ] 3.3 Implement route activation: threshold monitoring + Hauler task self-assignment
- [ ] 3.4 Implement max concurrent haulers per route enforcement

## 4. Throughput Simulation

- [ ] 4.1 Implement 1Hz tick orchestrator for all active structures in simulation worker
- [ ] 4.2 Implement backpressure pause/resume on hauler routes based on buffer fill level
- [ ] 4.3 Add batch processing with upgrade multipliers (larger batches, not faster ticks)

## 5. Flow Metrics

- [ ] 5.1 Implement 60-second rolling production rate calculator per structure
- [ ] 5.2 Implement idle ratio tracker (idle ticks / total ticks over last 60s)
- [ ] 5.3 Implement bottleneck detection with INPUT_STARVED and OUTPUT_BLOCKED flags
- [ ] 5.4 Expose flow metrics via worker message API for UI consumption
