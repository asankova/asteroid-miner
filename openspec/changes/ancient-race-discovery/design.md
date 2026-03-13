## Context

The Architects are the game's primary antagonist — not in the shooter sense, but in the Lem sense: they are the consequence of what the player has been doing. Mining X-type asteroids disturbs something. That something was not supposed to wake up. The design principle is deliberate slow revelation: players should feel unease long before they understand what they're looking at. The Architects must feel genuinely alien — not humanoid enemies, but entities whose behavior follows rules the player has to decode rather than intuit. Their "awakening" is a 5-stage process taking many in-game hours at normal play pace.

## Goals / Non-Goals

**Goals:**
- Dormancy counter tied to X-type asteroid mining
- 5-stage awakening sequence with escalating manifestations
- Signal detector structure for ambient signal capture and partial decode
- Architect entity with alien movement and interference behavior
- Threat level as a global metric (increases only, never resets)

**Non-Goals:**
- Real-time combat (Architects interfere but do not destroy in v1)
- Architect base-building or territory claiming
- Player ability to permanently destroy Architects (containment is possible, not destruction)
- Full Architect language decode (partial decode drives narrative; full decode is never achieved by pure mining)

## Decisions

**Dormancy counter as a global float accumulator, not per-Architect**
The Architects are a collective; they awaken collectively. Individual mining events contribute to a shared disturbance pool. This avoids the problem of "accidentally" waking one Architect in isolation. Alternative: per-Architect wake state — creates a whack-a-mole dynamic that trivializes the threat.

**5-stage sequence as an enum state machine with threshold gates**
Each stage transition requires the dormancy counter to cross a defined threshold. Stages do not downgrade. Between thresholds, random variance events (minor anomalies) keep the tension alive without forcing progression. This prevents players from stalling at stage 2 indefinitely by not mining X-type asteroids — the game has other dormancy sources.

**Architect movement via a rule-based alien system, not pathfinding**
Architect entities do not use A* or behavior trees. Their movement follows a rule: move toward the centroid of the 3 highest-disturbance X-type asteroids, decelerate when within 1000 units, oscillate in a slow Lissajous pattern when stationary. This is computationally cheap and behaviorally alien — players cannot predict it using game-genre intuition.

**Threat level as a one-way ratchet**
Threat only increases. Players who try to "de-escalate" by stopping X-type mining will find the Architects remain at their current awakening stage. This is intentional: the game is about understanding consequences, not undoing them.

## Risks / Trade-offs

[Players may never trigger Stage 4+ if they avoid X-type asteroids] → The narrative systems (Xenomineralogy branch, Tier 3 agent communication) are gated behind X-type engagement. Players who avoid X-type miss the deep game. This is acceptable — the shallow game is complete without Architects.

[Architect interference at Stage 3 may be frustrating without explanation] → Every interference event is accompanied by an event card explaining what happened (in Lem-style prose) so players never feel blindsided without lore.

[Lissajous movement pattern may look like a bug] → Add subtle visual trail to Architect entities and a "Architect signature" indicator in the signal detector to normalize their presence visually.
