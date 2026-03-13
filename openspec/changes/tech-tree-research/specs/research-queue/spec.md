## ADDED Requirements

### Requirement: Queue Up to Five Items
The player SHALL be able to queue up to 5 research items simultaneously. The first item in the queue SHALL be the active research item receiving RP accumulation.

#### Scenario: Queue full rejection
- **WHEN** player attempts to add a 6th item to the research queue
- **THEN** the addition is rejected with QUEUE_FULL error

### Requirement: Active Research Progress Display
The active research item SHALL display a progress bar showing RP accumulated / RP required. Estimated time to completion SHALL be displayed based on current RP/s rate.

#### Scenario: ETA display
- **WHEN** active research has 1000 RP remaining and current RP/s is 10
- **THEN** displayed ETA is "~100 seconds"

### Requirement: Queue Reordering
The player SHALL be able to reorder items in the research queue via drag-and-drop. The item at position 1 immediately becomes active research.

#### Scenario: Queue reorder activates item
- **WHEN** player drags item 3 to position 1 in the queue
- **THEN** item 3 becomes the active research item and begins receiving RP
