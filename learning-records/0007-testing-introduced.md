# 0007 — Testing Introduced: pytest Fundamentals

**Date:** 2026-06-29
**Lesson:** `lessons/0010-writing-test-cases.html`

## What Was Taught

First lesson in the testing track. Covered the *why* of automated testing and the core mechanics of writing pytest tests — anchored in the org's testing guide (`testing.html`, `writing_tests_with_pytest.html`, `best_practices.html`).

## Key Concepts

### Why Test
- Tests verify code works under a defined set of conditions (they don't prove correctness universally)
- Primary value: confidence during refactoring — tests catch regressions automatically
- Well-named tests are specification documents: you can infer behaviour without reading implementation

### pytest Discovery Rules
- File: must match `test_*.py` or `*_test.py`
- Class: must start with `Test`, no `__init__`
- Function/method: must start with `test_`
- Violating any of these → test silently skipped, no error

### Thinking About Test Cases
Three categories to consider before writing a single test:
1. **Normal cases** — happy path inputs and expected returns
2. **Edge cases** — boundary values (0, negative, empty, None, single-item)
3. **Error cases** — inputs that should raise exceptions or trigger error branches

### Arrange–Act–Assert (AAA)
The canonical three-part structure for every test:
```python
def test_something():
    # Arrange — set up data
    # Act     — call the function
    # Assert  — verify the result
```
Keeping these visually separated makes failures easy to diagnose.

### assert Statement
- Passes silently when condition is True
- Raises AssertionError (with full diff) when False
- Use `pytest.raises(ExceptionClass)` as a context manager for exception assertions

### Test Naming Convention
Three-part formula: `test_<method>_<scenario>_<expected_result>`
Example: `test_get_movie_with_invalid_id_raises_not_found_exception`

### Django Setup
- `pip install pytest-django`
- `pytest.ini` in project root with `DJANGO_SETTINGS_MODULE`
- `@pytest.mark.django_db` decorator required for any test touching the database
- Each test runs against a rolled-back transaction — clean state guaranteed

### FIRST Checklist
Fast · Isolated · Repeatable · Self-Checking · Timely

## What Comes Next
- Lesson 11: Fixtures (`@pytest.fixture`) and parametrize (`@pytest.mark.parametrize`)
- Lesson 12: Factory Boy for generating model test data
- Future: Mocking with `unittest.mock` / `pytest-mock`
