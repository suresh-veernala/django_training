# 0012 — Testing & Mocking in the Social Network Context

## Date
2026-07-01

## What was covered
Lessons 13 (Testing with pytest) and 14 (Mocking), updated to use the Social Network (`fb_post`) domain throughout.

---

## Key insights

### Test setup with Poetry
Dev dependencies are added with `poetry add --group dev`. The required packages for org projects are:
```
poetry add --group dev pytest pytest-django factory-boy
```
pytest.ini sits in the project root and sets `DJANGO_SETTINGS_MODULE = social_network.settings.local`.

### Listing cases first (org convention)
Before writing any code, write a comment block listing all cases:
- **Normal**: happy path — valid user, valid content → returns `post_id`
- **Edge**: boundary — content exactly 1000 chars
- **Error**: invalid input → specific exception (`InvalidUserException`, `InvalidPostContent`)

### AAA structure
Every test: **Arrange** (build mocks + data), **Act** (call interactor), **Assert** (check result).
Test names follow `test_<method>_with_<scenario>_<expected>`.

### Factory Boy for Social Network models
Three factories cover all FK chains:
- `UserFactory` — no FKs
- `PostFactory` — `SubFactory(UserFactory)` for `posted_by`
- `CommentFactory` — `SubFactory(PostFactory)` and `SubFactory(UserFactory)`

`conftest.py` exposes `user_object`, `post_object`, `comment_object` fixtures with the `_object` suffix (org convention).

### Mocking the injected storage
Interactors take `storage` in `__init__`. Use `create_autospec(StorageClass)` — not plain `Mock()` — so typos raise `AttributeError` immediately.

```python
storage_mock = create_autospec(CreatePostStorageImplementation)
storage_mock.create_post.return_value = 42
```

### Asserting call arguments
After calling the wrapper, verify the interactor forwarded the right args:
```python
storage_mock.create_post.assert_called_once_with(user_id=1, post_content="Hello!")
```

### side_effect for exception paths
```python
storage_mock.validate_user_id.side_effect = InvalidUserException
```
Then assert `pytest.raises(InvalidUserException)`.

### patch() for imported dependencies
Use `@patch('module.name')` when the dependency is imported _inside_ the function (e.g., `get_service_adapter()` in an interactor).

### create_autospec vs Mock
- `Mock()` — quick and flexible but allows silent typos
- `create_autospec(RealClass)` — enforces the real interface, catches attribute mismatches

---

## Assignment (Lesson 15)
Write 30 test cases covering all five Social Network interactors:
`CreatePost`, `GetPost`, `CreateComment`, `ReactToPost`, `DeletePost`.
Each must cover normal, error, and at least one mock-assertion case.
Use `create_autospec` on all storage mocks.
