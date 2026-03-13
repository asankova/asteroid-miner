## Why

Robots and processing structures need physical infrastructure: a home base, power generation, relay networks for communication, and storage. Infrastructure introduces spatial planning as a gameplay mechanic — where you build matters because power transmission decays with distance and relay coverage determines robot autonomy range.

## What Changes

- Define 8 structure types: **Command Hub** (player HQ, required for game start), **Solar Array** (power generation, degrades with distance from sun), **Fusion Reactor** (mid-game high-output power, requires helium-3), **Storage Depot** (material buffer, upgradeable capacity), **Relay Beacon** (extends robot comms/autonomy range), **Science Lab** (generates RP, requires power + crew), **Repair Bay** (repairs damaged robots), **Launch Rail** (inter-asteroid travel acceleration for Haulers)
- Implement power grid: structures and robots draw from a shared power pool; power deficit throttles performance; power is transmitted via beacon network, decaying with distance
- Implement relay network coverage: robots operating outside relay range lose coordination bonuses and behavior tree efficiency
- Add construction pipeline: Builder robots construct structures from advanced components; construction has stages (foundation, assembly, activation)
- Implement structure health and maintenance: structures degrade over time; neglected structures reduce efficiency; catastrophic failure possible
- Add modular upgrades: most structures have 3 upgrade tiers increasing throughput, efficiency, or range

## Capabilities

### New Capabilities
- `structure-entity`: Core structure data model with type, health, power draw, upgrade tier, and placement
- `power-grid`: Shared power pool with generation tracking, consumption sum, and deficit throttling
- `relay-network`: Coverage map from beacon placement; computes robot coordination bonus by position
- `construction-pipeline`: Multi-stage construction task for Builder robots with component requirements
- `structure-maintenance`: Degradation over time and repair task generation for Repair Bay

### Modified Capabilities
- `robot-entity`: Gains relay-coverage-bonus modifier on behavior tree efficiency (from robot-agent-system)

## Impact

- Infrastructure placement is a major spatial strategy layer
- Power grid creates meaningful tradeoff between expansion speed and stability
- Relay network range directly constrains early-game robot operation area
- Construction pipeline is the critical path for all structure deployment — builder robot availability is a strategic bottleneck
