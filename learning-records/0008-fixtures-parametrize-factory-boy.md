# 0008 — Fixtures, Parametrize & Factory Boy

**Date:** 2026-06-29
**Lesson:** `lessons/0011-fixtures-parametrize-factory-boy.html`

## What Was Taught

Combined lesson covering pytest's two DRY tools (fixtures and parametrize) alongside Factory Boy for Django model test data generation.

## Key Concepts

### @pytest.fixture
- Extract repeated Arrange code into a function decorated with `@pytest.fixture`
- pytest injects it as a function argument — no import needed
- A new object is created per test — no shared state
- Put in same test file (local) or `conftest.py` (shared across all files in directory)
- Org convention: fixture names use `_object` suffix for model instances (`movie_object`, not `movie`)

### conftest.py
- Special pytest file: fixtures defined here are automatically available to all tests in the same directory tree
- No explicit import required in test files

### @pytest.mark.parametrize
- Runs the same test function with different inputs — each input is a separate test
- Avoids logic (loops, if-statements) inside test bodies
- Single param: `@pytest.mark.parametrize("x", [1, 2, 3])`
- Multiple params: `@pytest.mark.parametrize("title, slug", [("The Dark Knight", "the-dark-knight"), ...])`
- Each run appears separately in output with the input value in the name

### Factory Boy — DjangoModelFactory
- Always use `factory.django.DjangoModelFactory` for Django models (not plain `factory.Factory`)
- Calls `Model.objects.create()` automatically
- Define default values for all fields in the factory class body
- Override specific fields at call time: `MovieFactory(rating=9.2)`

### Key Declarations
| Declaration | Purpose |
|---|---|
| `factory.Sequence(lambda n: f"val{n}")` | Unique values — essential for `unique=True` DB fields |
| `factory.LazyAttribute(lambda obj: ...)` | Derive one field from another field on the same object |
| `factory.SubFactory(OtherFactory)` | Automatically create related FK objects |

### create() vs build()
- `MovieFactory()` or `MovieFactory.create()` — saves to DB, requires `@pytest.mark.django_db`
- `MovieFactory.build()` — in-memory only, no DB, faster
- `MovieFactory.create_batch(n)` — creates n saved objects at once

### Org Folder Layout
```
tests/
  factories/
    __init__.py       ← re-exports all factories
    movie_factory.py
    actor_factory.py
  conftest.py         ← fixtures
  common_fixtures/    ← reusable mocks
```

## What Comes Next
- Lesson 12: Mocking — isolating units from collaborators using `unittest.mock.patch`
