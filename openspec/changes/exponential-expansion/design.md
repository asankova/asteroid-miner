## Context

The exponential expansion phase is the game's climax and thesis: the player watches their operation transform from a managed enterprise into a self-replicating civilization that fills the asteroid belt. The Replicator Unit is the von Neumann probe of the game — a robot that can make copies of itself from local resources. Once deployed, population growth becomes geometric. The Growth Dashboard makes this explicit: players watch doubling times, see the log-scale curve steepen, and eventually confront carrying capacity. This is designed to be awe-inspiring and slightly unsettling.

## Goals / Non-Goals

**Goals:**
- Replicator Unit with self-fabrication loop using local resources
- Log-scale growth dashboard with doubling time and saturation projection
- Carrying capacity mechanics with marginal yield decay
- Frontier expansion probes for inter-cluster growth
- Cascade events for pacing without punishment
- Growth replay time-lapse

**Non-Goals:**
- Replicator combat or defensive replicators (separate proposal)
- Player-designed replicator blueprints (fixed design in v1)
- Cross-game-session growth (expansion resets on new game)

## Decisions

**Fabrication time 3 real-time minutes per unit**
Fast enough to see growth within a play session (doubling time ~6-10 minutes at full resource supply), slow enough that early reckless deployment doesn't trivialize the game. Fabrication time can be reduced by tech tree upgrades. Alternative: instant fabrication — defeats the educational point; growth must unfold in real-time to be felt.

**Carrying capacity as soft ceiling with marginal yield decay**
Rather than a hard cap, resource yields decay as a function of local extraction saturation. At 50% saturation, yields are 80% of base; at 90% saturation, yields are 30% of base. This creates natural slowdown that feels organic rather than punitive. The dashboard shows the saturation curve so players can see it coming.

**Frontier expansion as a Tier 5 agent proposal, not automatic**
Even at T5, inter-cluster expansion is proposed by the Architect agent and displayed as a major strategic decision. The player acknowledges it. This is the game's "moment" — the decision to expand beyond the original belt is irreversible and the game makes it feel that way.

**Cascade events as brief, visible, recoverable disruptions**
Cascade events reduce growth rate for 30–120 seconds but don't cause permanent damage. They appear as dramatic visual effects (power cascade arcs, robot coordination storms visible in the field) and create the pacing rhythm that prevents exponential growth from feeling like a passive idle game.

## Risks / Trade-offs

[Exponential growth may exhaust simulation entity budget (max entities)] → Entity budget cap is 10,000 robots; beyond this, the simulation aggregates robots into "swarm units" that are rendered as a single entity count. This must be handled gracefully.

[Log-scale dashboard may be confusing for players unfamiliar with logarithms] → Include a "switch to linear view" toggle; the linear view makes the J-curve dramatic even without log understanding.

[Cascade events must feel fair, not random punishment] → Cascade events are seeded at fixed growth thresholds (not random timing), so their first occurrence is always predictable and learnable.
