# Resources

Trusted sources used to ground the lessons. Prefer these over parametric knowledge.

## Primary (official)

- **Django documentation** — https://docs.djangoproject.com/en/5.1/
  The canonical reference. Authoritative, version-pinned.
- **Django at a glance** — https://docs.djangoproject.com/en/5.1/intro/overview/
  5-minute high-level overview. Best primary source for Lesson 1.
- **Writing your first Django app (Tutorial)** — https://docs.djangoproject.com/en/5.1/intro/tutorial01/
  The polls tutorial. Maps to the hands-on "Django Tutorial – Part 1".
- **Models** — https://docs.djangoproject.com/en/5.1/topics/db/models/
- **Making queries (ORM)** — https://docs.djangoproject.com/en/5.1/topics/db/queries/
- **QuerySet API reference** — https://docs.djangoproject.com/en/5.1/ref/models/querysets/
- **Field lookups / aggregation** — https://docs.djangoproject.com/en/5.1/topics/db/aggregation/
- **Migrations** — https://docs.djangoproject.com/en/5.1/topics/migrations/
- **Django REST Framework** — https://www.django-rest-framework.org/
- **DRF Serializers** — https://www.django-rest-framework.org/api-guide/serializers/
- **DRF Views / APIView** — https://www.django-rest-framework.org/api-guide/views/
- **OpenAPI 3.0 Specification** — https://spec.openapis.org/oas/v3.0.3
- **Swagger UI** — https://swagger.io/tools/swagger-ui/

## High-quality secondary

- **Real Python — Django** — https://realpython.com/tutorials/django/
- **MDN — Django web framework** — https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django
- **classy-class-based-views** (DRF/Django CBV explorer) — https://www.cdrf.co/

## Communities (for wisdom)

- **r/django** — https://www.reddit.com/r/django/
- **Django Forum** — https://forum.djangoproject.com/
- **DRF GitHub Discussions** — https://github.com/encode/django-rest-framework/discussions
- **Stack Overflow [django] tag** — https://stackoverflow.com/questions/tagged/django

## Python Tooling

- **Poetry official docs** — https://python-poetry.org/docs/
  Full CLI reference, configuration, and guides. The canonical source.
- **Poetry CLI reference** — https://python-poetry.org/docs/cli/
  Every command with all flags, well-documented.
- **DigitalOcean — Install Poetry on Ubuntu 22.04** — https://www.digitalocean.com/community/tutorials/how-to-install-poetry-to-manage-python-dependencies-on-ubuntu-22-04
  High-quality step-by-step guide: install, new project, add/remove/pin deps. Primary source for Lesson 12.
- **AWS CLI install guide** — https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
  Official macOS/Linux/Windows installer docs. Primary source for Lesson 13.
- **AWS CodeArtifact — configure pip/Poetry** — https://docs.aws.amazon.com/codeartifact/latest/ug/python-configure-pip.html
  Official AWS docs for connecting Python package managers to CodeArtifact.
- **CodeArtifact + Poetry complete workflow** — https://jasonstitt.com/private-packages-codeartifact-poetry-workflow
  Excellent end-to-end guide covering publishing and consuming private packages.

## Internal (self-contained, no dependency on attached folder)

- **IMDb Assignment Pack** — `reference/internal-django-course-pack.html`
  - IMDb data model (Movie, Actor, Director, Cast, Rating)
  - Assignment 1 — IMDb (models, populate, basic ORM)
  - Assignment 2 — IMDb Contd-1 (filtering & lookups)
  - Assignment 3 — IMDb Contd-2 (aggregation & annotation)
  - Assignment 4 — IMDb Contd-3 (optimization & bulk ops)
  - Each task includes its exact function signature
