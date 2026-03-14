# Asteroid Miner

A browser-based space mining simulation built with TypeScript and WebGL2. You command a squad of autonomous robots to survey, mine, and haul resources from a procedurally generated asteroid field.

> This project is built as part of the [Multiverse School class #182](https://themultiverse.school/classes/182) — prompting along with Liz.

---

## Features

- **WebGL2 rendering** — GPU-accelerated instanced drawing of 1500+ asteroids at 60fps with level-of-detail (LOD) and a particle system
- **Procedural asteroid field** — Poisson-disk sampled field with 4 biome zones (Inner Ore, Middle Mixed, Outer Volatile, Ancient Debris) and 9 asteroid types (C, S, M, V, D, H, A, X, Unknown)
- **Autonomous robot AI** — Behavior-tree driven agents: Scout, Miner, Hauler, Builder, Fabricator, Sentinel
- **Mining simulation** — Resource concentration maps, yield calculation, structural integrity, cargo manifests
- **Haul & depot system** — Robots auto-haul full cargo to the central resource depot
- **Live HUD** — FPS counter, robot telemetry feed, asteroid inspection on click
- **Camera** — Pan and zoom across the full 50,000 × 50,000 world-unit field

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- A modern browser with WebGL2 support (Chrome 56+, Firefox 51+, Safari 15+)

### Install

```bash
git clone https://github.com/your-org/asteroid-miner.git
cd asteroid-miner
npm install
```

### Run locally

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build with:

```bash
npm run preview
```

---

## How to Play

1. **The field loads automatically** — 1,500 asteroids are generated from a random seed each run.
2. **Robots spawn at the center** — a Scout, two Miners, a Hauler, and a Builder start near the resource depot.
3. **Click an asteroid** to direct the first available Miner to it. Mining starts immediately.
4. **Watch the telemetry feed** (bottom-left) to see what each robot is doing in real time.
5. **Robots are autonomous** — Miners fill their cargo hold, then Haulers (or the Miners themselves) ferry resources back to the depot automatically.
6. **Zoom and pan** with your mouse/trackpad to explore the field and inspect different biome zones.

### Asteroid Types

| Type | Name | Notes |
|------|------|-------|
| C | Carbonaceous | Common, carbon-rich |
| S | Silicaceous | Rocky, metal traces |
| M | Metallic | High metal yield |
| V | Vesicular | Volcanic origin |
| D | Dark | Organic-rich, outer belt |
| H | High-metal | Dense metallic core |
| A | Achondritic | Rare, differentiated body |
| X | Exotic | Unknown composition — survey first |

### Robot Roles

| Robot | Role |
|-------|------|
| Scout | Surveys unknown asteroids and maps the field |
| Miner | Drills and extracts resources |
| Hauler | Ferries cargo from mining sites to the depot |
| Builder | Constructs infrastructure |
| Fabricator | Manufactures components |
| Sentinel | Defensive patrol |

---

## Project Structure

```
src/
  renderer/     WebGL2 instanced rendering, camera, LOD, particles
  simulation/   Robot entities, behavior trees, task queue, telemetry
  world/        Asteroid field generation, biomes, noise, resources
  mining/       Yield calculation, tools, structural integrity
  types/        Shared TypeScript interfaces and enums
  main.ts       Game loop and bootstrap
```

---

## Tech Stack

- **TypeScript** + **Vite**
- **WebGL2** (no canvas 2D, no game engine)
- **simplex-noise** for procedural generation
- **Behavior Trees** for robot AI

---

## License

MIT — see [LICENSE](LICENSE).

---

## Acknowledgements

Built during [Multiverse School class #182](https://themultiverse.school/classes/182), prompting along with Liz.
