from fastapi.testclient import TestClient

from app_final import app

client = TestClient(app)


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
