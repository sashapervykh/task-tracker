import pytest
from fastapi.testclient import TestClient

from app_final import app, clear_tasks

client = TestClient(app)


@pytest.fixture(autouse=True)
def empty_storage() -> None:
    clear_tasks()


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_version_uses_default_when_env_is_missing(monkeypatch) -> None:
    monkeypatch.delenv("APP_VERSION", raising=False)

    response = client.get("/version")

    assert response.status_code == 200
    assert response.json() == {"version": "0.1.0"}


def test_root_uses_default_name_when_env_is_missing(monkeypatch) -> None:
    monkeypatch.delenv("APP_NAME", raising=False)

    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["name"] == "task-tracker"
    assert response.json()["audience"] == "личный список задач через HTTP API"


def test_created_task_is_listed_with_priority_and_due_date() -> None:
    created = client.post(
        "/tasks",
        json={"title": "Купить молоко", "priority": "high", "due_date": "2026-10-31"},
    )

    assert created.status_code == 201
    task = {
        "id": 1,
        "title": "Купить молоко",
        "priority": "high",
        "due_date": "2026-10-31",
        "done": False,
    }
    assert created.json() == task

    listed = client.get("/tasks")

    assert listed.status_code == 200
    assert listed.json() == [task]


def test_priority_defaults_to_medium() -> None:
    response = client.post("/tasks", json={"title": "Купить молоко", "due_date": "2026-10-31"})

    assert response.status_code == 201
    assert response.json()["priority"] == "medium"
    assert response.json()["done"] is False


def test_empty_title_is_rejected() -> None:
    response = client.post("/tasks", json={"title": "   ", "due_date": "2026-10-31"})

    assert response.status_code == 422


def test_unknown_priority_is_rejected() -> None:
    response = client.post(
        "/tasks",
        json={"title": "Купить молоко", "priority": "urgent", "due_date": "2026-10-31"},
    )

    assert response.status_code == 422


def test_invalid_due_date_is_rejected() -> None:
    response = client.post(
        "/tasks",
        json={"title": "Купить молоко", "due_date": "31-10-2026"},
    )

    assert response.status_code == 422


def test_list_filters_by_priority() -> None:
    client.post("/tasks", json={"title": "Низкий", "priority": "low", "due_date": "2026-10-01"})
    client.post("/tasks", json={"title": "Высокий", "priority": "high", "due_date": "2026-10-02"})
    client.post("/tasks", json={"title": "Ещё высокий", "priority": "high", "due_date": "2026-10-03"})

    response = client.get("/tasks", params={"priority": "high"})

    assert response.status_code == 200
    assert [task["title"] for task in response.json()] == ["Высокий", "Ещё высокий"]


def test_list_sorts_by_due_date() -> None:
    client.post("/tasks", json={"title": "Позже", "priority": "low", "due_date": "2026-12-01"})
    client.post("/tasks", json={"title": "Раньше", "priority": "high", "due_date": "2026-10-01"})

    ascending = client.get("/tasks", params={"sort_by": "due_date", "order": "asc"})
    descending = client.get("/tasks", params={"sort_by": "due_date", "order": "desc"})

    assert [task["title"] for task in ascending.json()] == ["Раньше", "Позже"]
    assert [task["title"] for task in descending.json()] == ["Позже", "Раньше"]


def test_list_sorts_by_priority() -> None:
    client.post("/tasks", json={"title": "Низкий", "priority": "low", "due_date": "2026-10-01"})
    client.post("/tasks", json={"title": "Высокий", "priority": "high", "due_date": "2026-10-02"})
    client.post("/tasks", json={"title": "Средний", "priority": "medium", "due_date": "2026-10-03"})

    ascending = client.get("/tasks", params={"sort_by": "priority", "order": "asc"})
    descending = client.get("/tasks", params={"sort_by": "priority", "order": "desc"})

    assert [task["priority"] for task in ascending.json()] == ["low", "medium", "high"]
    assert [task["priority"] for task in descending.json()] == ["high", "medium", "low"]


def test_list_filters_and_sorts_together() -> None:
    client.post("/tasks", json={"title": "Высокий позже", "priority": "high", "due_date": "2026-12-01"})
    client.post("/tasks", json={"title": "Низкий", "priority": "low", "due_date": "2026-10-01"})
    client.post("/tasks", json={"title": "Высокий раньше", "priority": "high", "due_date": "2026-11-01"})

    response = client.get(
        "/tasks",
        params={"priority": "high", "sort_by": "due_date", "order": "asc"},
    )

    assert [task["title"] for task in response.json()] == ["Высокий раньше", "Высокий позже"]


def test_unknown_sort_parameters_are_rejected() -> None:
    assert client.get("/tasks", params={"sort_by": "title"}).status_code == 422
    assert client.get("/tasks", params={"order": "up"}).status_code == 422
    assert client.get("/tasks", params={"priority": "urgent"}).status_code == 422


def test_order_without_sort_by_is_rejected() -> None:
    assert client.get("/tasks", params={"order": "asc"}).status_code == 422
    assert client.get("/tasks", params={"order": "desc"}).status_code == 422
