# Full 6-Module Course Scaffolded from Training Plan

The mission expanded from "intro to Django" to the complete internal Django Backend Training plan: 6 instructor modules (Intro, Project Structure, Models & ORM, Building APIs, OpenAPI/Swagger, Wrap Up) plus a 4-hour hands-on track (tutorial, IMDb + Social Network assignments, REST APIs, OpenAPI spec).

## Implications

- All six lessons now exist (`lessons/0001`–`0006`) and use a shared IMDb domain (Movie / Actor / Director) so examples interleave with the assignments the user will actually do.
- Two reference docs exist: `django-cheatsheet.html` (concepts) and `orm-cheatsheet.html` (ORM API). Adhere to this Movie/Actor/Director vocabulary in future lessons.
- Coverage ≠ learning. The user has been *presented* MVT, project structure, ORM, DRF, and OpenAPI but has not yet demonstrated mastery. Next real signal comes from the hands-on assignments — future learning records should capture what they actually build/struggle with.
- Likely next deep-dives once assignments start: ForeignKey vs M2M modelling decisions, the N+1 problem with real SQL, and DRF serializer validation.
