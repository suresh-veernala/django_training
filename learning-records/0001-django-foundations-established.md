# Django Foundations Established

First session covered Django's core mental model: MVT architecture, the HTTP request lifecycle through urls.py → View → ORM → Database → JSON response, and the ORM's QuerySet API. The user has seen how a minimal REST endpoint is structured across models.py, serializers.py, views.py, and urls.py.

## Implications

- Future sessions can assume familiarity with MVT vocabulary and the layered request flow.
- The ORM basics (all, filter, get, create) have been introduced but not yet practiced hands-on — the next session should include real project setup and running queries in a shell.
- DRF serializer and function-based view pattern has been shown; ViewSets and Routers are a natural next step once the basics are solid.
