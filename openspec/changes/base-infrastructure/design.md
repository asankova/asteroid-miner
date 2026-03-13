## Context

Infrastructure is the physical foundation: structures, power, communications. Power introduces genuine scarcity (the player must plan generation capacity) while relay networks introduce spatial constraints (robots out of range lose coordination bonuses). The construction pipeline introduces a strategic bottleneck: Builder robots and advanced components are required to place any structure. This creates interesting tradeoffs early: do you build a second Smelter or a Relay Beacon?

## Goals / Non-Goals

**Goals:**
- 8 structure types with placement, health, and upgrade tiers
- Shared power pool with generation/consumption tracking and deficit throttling
- Relay network coverage map affecting robot coordination bonus
- Construction pipeline with staged Builder robot tasks
- Degradation and maintenance system

**Non-Goals:**
- Real-time power transmission simulation (power is a global pool, not simulated per wire)
- Structure destruction by player (salvage/demolish in later proposal)
- Inter-asteroid logistics network (same proposal as expansion)

## Decisions

**Power as a global pool, not per-structure simulation**
All generators contribute to one pool; all consumers draw from it. Deficit is global. This is simpler and more legible to the player than per-node power flow simulation. If demand exceeds supply, structures are throttled proportionally by priority class. Alternative: per-relay-node power simulation — adds complexity without proportional gameplay value.

**Relay coverage as a Voronoi-like coverage radius**
Each Relay Beacon broadcasts a coverage circle of fixed radius (upgradeable). Robots in any beacon's radius receive coordination bonus. Coverage is pre-computed as a coverage map updated when beacons are placed or destroyed. Alternative: signal strength falloff — more realistic but adds float precision to what should be a binary in/out signal.

**Construction as a multi-stage task sequence**
Construction has 3 stages: Foundation (place site, mark as "under construction"), Assembly (Builder robot spends time + components), Activation (power connect + system register). Each stage is a separate Builder task. Stages can be interrupted and resumed. This makes construction feel tangible and interruptable, unlike instant placement.

**Maintenance as a slow degradation curve**
Each structure has health (0–100%). Health decreases at a type-specific rate per hour. Below 50% health, output efficiency degrades proportionally. At 10% health, a WARNING event is emitted. At 0%, structure FAILS and stops functioning until repaired. Repair Bay robots auto-generate REPAIR tasks for nearby low-health structures.

## Risks / Trade-offs

[Global power pool makes blackouts feel arbitrary if player can't anticipate demand] → Show projected demand vs supply with a safety margin warning before deficit occurs.

[Builder robot as construction bottleneck may feel punishing in early game] → Start with 1 free Builder robot; make Builder unlock cheap in tech tree (Robotics T1).

[3-stage construction can feel slow for simple structures] → Foundation is instantaneous; Assembly + Activation take time proportional to structure complexity. Relay Beacons are fast; Molecular Assemblers are slow.
