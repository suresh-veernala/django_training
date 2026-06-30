# 0010 — Full Environment Setup: Poetry + AWS CLI + CodeArtifact

## Date
2026-06-29

## What was covered
Lesson 13: Full Environment Setup — connecting Poetry to a company's private AWS CodeArtifact registry.

Three tools were introduced together:
- **Poetry** — installed via official script (not pip), configured with `virtualenvs.in-project true`
- **AWS CLI v2** — installed via the official macOS PKG installer; configured with `aws configure`
- **AWS CodeArtifact** — company's private PyPI; Poetry authenticated with a 12-hour token

Key workflow:
1. `aws codeartifact get-authorization-token` → fetch a time-limited token
2. `poetry source add --priority=supplemental codeartifact <url>/simple/` → register the source
3. `poetry config http-basic.codeartifact aws $TOKEN` → store credentials
4. `poetry install` → installs all deps, pulling private packages from CodeArtifact

## Key insights
- The CodeArtifact URL must end with `/simple/` for *installing* packages (PEP 503 API); without it Poetry cannot discover packages.
- Username is always the literal string `aws` — it's not your IAM username.
- Tokens expire in 12 hours — this is the most common source of auth failures the next day.
- In CI, prefer environment variables (`POETRY_HTTP_BASIC_CODEARTIFACT_USERNAME/PASSWORD`) over `poetry config` to avoid writing credentials to disk.
- `priority = "supplemental"` makes CodeArtifact a fallback; `primary` makes it the main source (useful when CodeArtifact proxies all of PyPI).

## Zone of proximal development (after this lesson)
- Applying this setup to the real `imdb` project (migrate from requirements.txt)
- Adding token refresh to a shell script or Makefile
- CI integration: getting CodeArtifact tokens in GitHub Actions workflows
