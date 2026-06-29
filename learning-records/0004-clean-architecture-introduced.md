# Clean Architecture Introduced (Org-Specific Pattern)

User completed the first Clean Architecture lesson, grounded in the org's internal training materials (`env_files/content_preparation_refernces/clean_architecture/`).

## Key Concepts Covered

### The Four Modules
The org's Clean Architecture splits every feature into exactly four packages:

| Module | Responsibility | Volatility |
|---|---|---|
| **Interactor** | Business rules only | Stable |
| **Storage** | ORM queries (concrete) | Volatile |
| **Presenter** | JSON/HTML response building | Volatile |
| **Controller** (`views.py`) | HTTP request handling, wiring | Volatile |

### Dependency Inversion
- Interfaces (abstract classes) are defined **inside** `interactors/storages/` and `interactors/presenters/`
- Concrete implementations (in top-level `storages/` and `presenters/`) import and implement those interfaces
- The Interactor depends only on the interfaces — never on concrete implementations
- Python uses `ABC` + `@abstractmethod` from the standard library as the interface mechanism

### App Structure Pattern
Two levels of `storages/` and `presenters/` exist:
- `interactors/storages/` → interface definitions
- `storages/` (top-level) → concrete implementations

### Testing Implication
Interactors are unit-tested with mock storages and mock presenters — no DB required. This is the primary motivation for Dependency Inversion in this codebase.

## Implications for Future Lessons
- When walking through any production code, always identify which of the four modules a file belongs to
- IMDb exercises should be structured using this pattern: model → storage → interactor → presenter → views
- Testing lessons should use this isolation property: mock injection into Interactors
- SOLID Principles (referenced in the source material) can be a follow-up lesson when the user is comfortable with the four-module pattern
