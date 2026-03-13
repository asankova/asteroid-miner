## Context

The event system is the primary vehicle for narrative, scientific discovery, and moral texture. Events interrupt normal gameplay with a short narrative moment — a log entry, an anomaly report, an unexpected behavior in the automation — and ask the player to respond. The tone is Stanislaw Lem: precise scientific language, dry understatement, and occasional inexplicable beauty. Events must be authored as data (not code) so writers can add and modify events without touching game logic. The consequence engine applies event outcomes to world state.

## Goals / Non-Goals

**Goals:**
- Data-driven event authoring (YAML format)
- Condition-based event triggering evaluated each game tick
- Event cards with 1–3 choices and consequence payloads
- Multi-event chains with state-gated progression and branching
- Event log with full history
- 60+ authored events across 5 categories

**Non-Goals:**
- Real-time event interruption (events queue and fire at clean game ticks, not mid-action)
- Procedurally generated event prose (all prose is hand-authored)
- Player-authored events or mods (v1)

## Decisions

**Events as YAML data files loaded at startup**
All event definitions live in `events/` directory. The engine loads and validates them at startup. This separates content from engine. Writers need no code access. Alternative: events hardcoded in TypeScript — rejected because it conflates content and logic and makes iteration slow.

**Event condition as a DSL expression string**
Conditions are strings like `automation_tier >= 3 AND threat_level > 20 AND NOT flag.SIGNAL_1_SEEN`. A small expression parser evaluates these against world state. This keeps conditions readable and authorable without requiring code. Supported operators: AND, OR, NOT, >=, <=, >, <, ==, flag.FLAG_NAME, event.EVENT_ID_SEEN.

**Choice consequences as a typed payload list**
Each choice has a list of consequence objects: {type: "SET_FLAG", flag: "X"} | {type: "ADD_RESOURCE", material: "iron_ore", amount: 100} | {type: "ADD_RP", amount: 500} | {type: "UNLOCK_RESEARCH", node: "xenomineralogy_t1"} | {type: "MODIFY_THREAT", delta: 5} | {type: "INJECT_CORPUS", pattern: "signal_7"} | {type: "CHAIN_ADVANCE", chain: "C1", step: 2}. Engine processes the list on choice selection.

**Event fire rate limiting: max 1 event per 120 seconds**
To prevent event spam, a global cooldown prevents a new event from firing within 120 seconds of the previous. Events queue and fire in order when cooldown expires. This keeps events feeling significant, not routine.

## Risks / Trade-offs

[60+ events is a significant writing commitment] → Author 20 events for v1 across all 5 categories; fill remaining in post-v1 passes. Engine must work with any count.

[Expression parser for conditions adds complexity] → Use a well-tested parsing library (e.g., jexl or equivalent); don't hand-roll the parser.

[Event chains with branching can create orphan states] → Validate chain graphs at load time; detect unreachable steps and warn.
