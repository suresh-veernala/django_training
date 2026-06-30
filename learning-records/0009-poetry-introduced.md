# 0009 — Poetry Introduced

## Date
2026-06-29

## What was covered
Lesson 12: Poetry — Python Dependency Management.

Core ideas the user encountered:
- Why `pip` + `requirements.txt` breaks down in teams (no lock file, no dev/prod split, manual virtualenv)
- Poetry as the modern alternative: single `pyproject.toml`, automatic virtualenv, deterministic `poetry.lock`
- Installation via the official installer script (not pip)
- Key commands: `poetry add`, `poetry add --group dev`, `poetry remove`, `poetry install`, `poetry run`, `poetry shell`
- The caret (`^`) version constraint — compatible with major version
- Lock file semantics: commit `poetry.lock`, never commit `.venv/`
- Migration path from an existing `requirements.txt` project

## Key insights
- The lock file is the central feature — it's what distinguishes Poetry from a convenience wrapper around pip. Pinning transitive deps prevents "works on my machine" failures.
- `poetry run` is a lightweight alternative to `poetry shell` — useful in CI where activating a shell is awkward.
- `--group dev` separates test/dev tooling from production dependencies, which matters for production Docker images.

## Zone of proximal development (after this lesson)
- Using Poetry in a real Django project (migrate the existing `imdb` app)
- Understanding `poetry export` to generate `requirements.txt` for Docker-based deployments
- Multi-environment configuration with `poetry env use`
