# 0005 — DSU: Django Swagger Utils

**Date:** 2026-06-29
**Lesson:** `lessons/0008-dsu-and-snapshot-testing.html`

## What Was Taught

Django Swagger Utils (DSU) is the org's internal framework for building production-grade Django APIs. This lesson covered the full development workflow — from scaffolding to building views and writing presenters — without any testing concerns.

## Key Concepts

### Multiple Settings Files
- Projects have `local.py`, `base_swagger_utils.py`, `alpha.py`, `base_pg_db.py` etc.
- `DJANGO_SETTINGS_MODULE` env var controls which file is active.
- `base_swagger_utils.py` is the file DSU reads.

### Creating & Registering an App
- `python manage.py create_cleanapp <app_name> -p <project_name>` — scaffolds full Clean Architecture structure.
- Must register in **two** places in `base_swagger_utils.py`: the `APPS` list AND `SWAGGER_UTILS["APPS"]` dict.
- Forgetting `SWAGGER_UTILS["APPS"]` is the #1 cause of missing endpoints after `build`.

### Building Views from OpenAPI Spec
- Place spec at `<app_name>/api_specs/api_spec.json`.
- `python manage.py build -a <app_name>` — generates one folder per `operationId` in `views/`.
- `python manage.py build -at` — builds all virtual-env-installed apps.

### Generated File Structure (per view folder)
| File | Purpose |
|---|---|
| `api_wrapper.py` | The only file you write — business logic, reads kwargs, calls interactor |
| `<operation_id>.py` | Auto-generated — parses request. Never edit. |
| `request_response_mocks.py` | Sample shapes for reference |
| `validator_class.py` | Pre-execution validation (runs before api_wrapper) |
| `__init__.py` | ENV_MOCK / ENV_IMPL toggle |

### Control Flow
```
urls.py → view file → validator_class → api_wrapper
```

### MOCK vs IMPL
- `ENV_MOCK` (default): DSU returns dummy data; `api_wrapper` is never called.
- `ENV_IMPL`: your `api_wrapper` runs.
- If code in `api_wrapper` seems to do nothing — always check `__init__.py` first.

### Reading Request Data in api_wrapper
- `kwargs['request_data']` — parsed JSON body as `OrderedDict` (use this)
- `kwargs['path_params']` — URL path parameters
- `kwargs['request_query_params']` — query string parameters
- `kwargs['user']` — authenticated Django User object
- `kwargs['user_dto']` — user as `UserDTO(user_id=...)` (preferred for interactors)

### Writing Presenters (HTTPResponseMixin)
- `JsonPresenter(PresenterInterface, HTTPResponseMixin)`
- Success: `self.prepare_201_created_response(data)`, `self.prepare_200_success_response(data)`
- Error: `self.prepare_400_bad_request_response(failure_data)`, `self.prepare_404_not_found_response(failure_data)`
- Error response must include all three fields: `response`, `http_status_code`, `res_status`

### Models in Multiple Files
- Use a `models/` folder instead of a single `models.py`
- `models/__init__.py` re-exports all classes so `from app.models import Foo` still works

## Revision Note

An earlier version of this record referenced snapshot testing (DSU's `create_snapshottest` command). That content was removed from this lesson at the user's request. Snapshot testing will be its own separate lesson.
