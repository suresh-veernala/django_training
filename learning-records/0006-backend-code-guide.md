# Backend Code Guide Introduced

User completed the org's Backend Style Guide lesson, covering folder structure, per-module rules, and Python conventions. This lesson sits between Clean Architecture (lesson 7) and DSU (lesson 8) in the learning sequence.

## Key Concepts Covered

### Expanded Folder Structure
Beyond the four core Clean Architecture folders, production apps also have:
- `adapters/` — inter-app communication (DTO conversion + exception re-raising)
- `app_interfaces/` — what this app exposes to other apps (`ServiceInterface`)
- `constants/` — config, enums, exception_messages (three files only)
- `exceptions/` — `custom_exceptions.py` for all app exceptions
- `populate/` — data seeding scripts that wrap interactors
- `tests/factories/` — Factory Boy model and DTO factories
- `tests/common_fixtures/` — reusable mocks across test files

### Naming Conventions
- Model/factory instances → `_object` suffix (e.g. `post_object`)
- DTO instances → `_dto` suffix (e.g. `post_dto`)
- Factory classes → `Factory` suffix; DTO classes → `DTO` suffix

### Import Rules
- Local imports (inside methods) are the default
- Absolute paths required — no relative imports
- Standard library (os, json, datetime) always global
- Third-party packages: import to module level, access class via module

### Typing Rules
- All method signatures (args + return) must be typed, including private methods
- Instance variables in `__init__` must be typed
- Local variables inside methods: no typing annotations

### Key Module Rules
- Interactors: DTOs for >3 args; never use Django models; local imports
- Presenters: DTO→dict conversion only here; return type is HttpResponse; one class per API
- Adapters: always convert foreign DTOs; always re-raise as own exceptions
- Tests: class-based; separate test file per interactor public method; use Factory Boy

### API Spec Convention
Every exception an API can raise must appear in the OpenAPI spec as a named response with `res_status` enum values.

## Implications for Future Lessons
- Every future lesson/exercise should use the `_object` / `_dto` naming convention
- Adapter pattern is the gateway to multi-app exercises — Factory Boy lesson will use common_fixtures
- Refactoring guidelines (split when grown) are actionable once user starts writing longer interactors
