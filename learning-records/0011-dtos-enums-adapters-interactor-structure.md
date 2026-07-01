# DTOs, Enums, Inter-App Communication, Interactor Wrapper/Main Structure

Lesson 14 introduced four tightly related building blocks of the org's Clean Architecture codebase.

## Key Concepts Covered

### DTOs (Data Transfer Objects)
- Plain `@dataclass` — no decorator arguments used in practice
- Typed fields; `Optional[X] = None` for fields that may be absent
- Class names end in `DTO`, variable names end in `_dto`
- DTOs live in `interactors/storages/dtos.py`, `interactors/presenters/dtos.py`, `interactors/dtos/dtos.py` (shared)
- DTOs used only within one interactor are defined in that interactor file itself

### Enums
- Use `class FooEnum(enum.Enum): VAL = "VAL"` — value equals name as a string
- All enums in `constants/enums.py`; group related enums together with comment separators
- Used in DTO fields (typed as enum, not str) and in OpenAPI `res_status` arrays

### Inter-App Communication (Adapters)
- App B exposes a `ServiceInterface` in `app_interfaces/service_interface.py`
- App A uses an Adapter in `adapters/` to talk to App B
- Individual adapter classes (e.g. `IbUsersServiceAdapter`) expose the foreign `ServiceInterface` as a `@property` named `interface`, with a local import inside it
- Three rules: always convert DTOs (never use App B's DTOs directly), always re-raise App B's exceptions as App A's own exceptions, keep DTOs in the adapter file unless shared across >3 adapters
- `ServiceAdapter` exposes each adapter as a `@property` with a local import (avoids circular imports, lazy-loads)
- `get_service_adapter()` module-level factory function is what interactors call (local import of this inside the method)

### Interactor Structure — Wrapper & Main
- `__init__` receives only `storage` (not presenter)
- **Wrapper method** (`create_post_wrapper`): public-facing, called from `api_wrapper`; receives `presenter` as argument; calls core method, gets back a DTO, passes it to `presenter.some_response(dto)`; catches exceptions and routes to presenter error methods
- **Core method** (`create_post`): pure logic, returns a DTO; raises domain exceptions; never catches them; never calls presenter
- `get_service_adapter()` is imported locally inside the core method (or a private helper) where the adapter is needed
- If a method has >3 args, group into a DTO
- When interactor B is composed inside A, catch B's exceptions in A's wrapper method
- One test file per public (wrapper) method

### Authentication (DSU OAuth2)
- `securityDefinitions` block (with `oauth` type) added once at top level of `api_spec.json`
- Per endpoint: `"security": [{"oauth": ["read"]}]` for GET, `["write"]` for POST/PUT/DELETE
- Endpoints without `"security"` key are public (e.g. login, refresh token)
- DSU validates the `Authorization: Bearer <token>` header automatically; on success injects `user_dto` into kwargs
- In `api_wrapper`: `user_id = str(kwargs['user_dto'].user_id)`
- For local testing: create an Access Token in Django Admin → Django OAuth Toolkit → Access tokens; set user, token string, and future expiry

## Implications for Future Sessions
- Any new feature exercise should now be written end-to-end: DTOs → enums → interactor (wrapper + core) → storage → presenter → adapter (if cross-app)
- DTO and enum design are the first decisions made when implementing a feature
