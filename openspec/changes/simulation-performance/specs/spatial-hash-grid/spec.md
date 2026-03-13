## ADDED Requirements

### Requirement: O(1) Cell Lookup
The spatial hash grid SHALL map any world position to a cell in O(1) time using integer division by cell size. All entities SHALL register their position on creation and update their cell on position change.

#### Scenario: Cell lookup performance
- **WHEN** an entity's position is updated
- **THEN** its cell registration is updated in O(1) time using floor(x/cellSize), floor(y/cellSize)

### Requirement: Radius Query
The grid SHALL support radius queries returning all entities within R world units of a query point. Queries SHALL scan only cells that overlap the radius bounding box.

#### Scenario: Radius query scope
- **WHEN** a radius query of R=300 is issued at position (1000, 1000) with cell size 200
- **THEN** at most 4 cells are scanned (ceil(300/200) = 2 cells in each direction from center cell)

### Requirement: Entity Type Filtering
Radius queries SHALL accept an optional entity type filter to return only robots, only asteroids, or only structures, avoiding unnecessary iteration over irrelevant entity types.

#### Scenario: Type-filtered query
- **WHEN** a radius query with filter=ASTEROID is issued
- **THEN** only asteroid entities are returned, robots and structures are excluded
