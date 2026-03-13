## Context

Mining is the primary economic input and the most frequent robot action. It must be fast to compute, tactically interesting, and scientifically grounded. The yield formula balances four inputs: tool efficiency, asteroid concentration, robot skill, and structural integrity modifier. Mining is also the primary trigger for two late-game systems: structural integrity drives fragmentation events (asteroid-field-generation), and rare yield events drive narrative unlocks (ancient-race-discovery, tech-tree-research). The mining loop must be correct and balanced before processing chain or tech tree can be tuned.

## Goals / Non-Goals

**Goals:**
- Four distinct tools with meaningful tradeoffs (speed vs efficiency vs risk vs precision)
- Yield formula that rewards strategic tool selection and asteroid targeting
- Structural integrity with fragmentation creating emergent field dynamics
- Ore grade system affecting downstream processing efficiency
- Rare yield events at appropriate frequency for narrative pacing

**Non-Goals:**
- Real-time physics of drilling (mining is resolved per-task, not per-frame)
- Tool crafting or repair (tools are installed via equipment slots, replaced not repaired)
- Asteroid terraforming or large-scale deformation

## Decisions

**Mining resolved per-task, not per-tick**
Mining tasks have a computed duration; the yield is calculated at task start and delivered at task completion. This avoids per-tick yield math and keeps the simulation step clean. Duration: floor(hardness × tool_speed_modifier × 60) seconds real-time. Alternative: per-tick incremental yield — adds state management complexity without gameplay benefit.

**Integrity damage is probabilistic per task, not deterministic**
Each mining task deals integrity damage sampled from a distribution around a tool-specific mean. This creates variance that makes structural events somewhat unpredictable, adding tension. Explosive charges have high variance (±40%); laser has low variance (±5%).

**Rare yield as a Bernoulli trial per task completion**
On task completion, roll against rare_yield_probability (tool × asteroid_type modifier). This is clean, stateless, and easy to tune. Probability range: 0.001 (standard drill on C-type) to 0.05 (precision laser on X-type).

**Ore grade derived from concentration value and tool precision**
Grade = clamp(concentration × tool_precision_modifier + gaussian_noise, 0, 1) mapped to A/B/C/D tiers. Precise tools (laser) produce higher average grade; explosive produces lower.

## Risks / Trade-offs

[Explosive charges creating too many child asteroids may overwhelm field entity budget] → Cap fragment count at 5; minimum fragment mass threshold prevents micro-asteroid proliferation.

[Rare yield probability tuning is difficult without playtesting data] → Make probability values data-driven (config file) so they can be tuned without code changes.

[Concurrent mining diminishing returns may make automation less satisfying] → Cap diminishing returns at 50% yield reduction; automation is still worthwhile, just not infinitely stackable.
