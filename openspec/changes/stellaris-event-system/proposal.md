## Why

The game needs a Stellaris-style short-form event system: small narrative cards that appear at key moments, present a choice, and have consequences that ripple forward. These events are the primary vehicle for storytelling, scientific discovery, and moral texture. They make the asteroid belt feel inhabited by history. Events must feel like they could be from a Lem novel — precise, strange, slightly unsettling.

## What Changes

- Implement **event engine**: event conditions are evaluated each game tick against world state (resource counts, automation tier, threat level, research unlocked, robot counts, time elapsed); when conditions match, event fires
- Define event categories: **Geological** (field phenomena, unusual formations), **Technical** (equipment behaviour, unexpected emergent patterns in automation), **Historical** (logs and data recovered from ancient derelicts), **First Contact** (escalating Architect-related events, gated by threat level), **Philosophical** (your own AI agents start asking questions)
- Create 60+ event cards with the following structure: title, 2–3 paragraphs of flavour text (Lem-quality prose), 1–3 choice options, consequence payload
- Consequences can modify: resource amounts, research unlock state, dormancy counter, robot behaviour flags, strategy agent language corpus, threat level, new event availability flags
- Implement **event chain system**: some events are part of multi-step chains; completing event N unlocks event N+1 (with time or state gates between them); chains can branch based on earlier choices
- Add **event log**: all fired events and player choices are stored in a scrollable log the player can review; this is also the game's story archive
- Event prose tone guidance: precise scientific language, first-person log entries, dry understatement, occasional beautiful strangeness; no purple prose; Lem not Asimov

## Capabilities

### New Capabilities
- `event-engine`: Condition-evaluation loop matching event triggers against world state each tick
- `event-card`: Individual event data model: conditions, prose, choices, consequence payloads
- `event-chain`: Multi-event sequence with branching and state-gated progression
- `event-log`: Persistent record of all player-encountered events and choices
- `consequence-engine`: Applies event outcomes to world state, research flags, corpus, and threat level

### Modified Capabilities
- `threat-level`: Gains event-trigger inputs from First Contact events (from ancient-race-discovery)
- `discovery-unlock`: Some research nodes are now unlockable via event consequences (from tech-tree-research)

## Impact

- Event prose quality is the primary differentiation between this and a generic idle game — writing must be exceptional
- The Philosophical event category is tightly coupled to llm-strategy-agents and substrate-narrative — agent reasoning patterns feed back into event triggers
- Event chains are the spine of the hidden plotline — their sequencing must be architected carefully
- Event engine must evaluate 60+ event conditions per tick without measurable performance impact
