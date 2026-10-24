import logging
import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from datetime import date
from pathlib import Path
from typing import Literal

import uvicorn
from fastapi import FastAPI, HTTPException, Query, Request, Response
from fastapi.exception_handlers import (
    http_exception_handler,
    request_validation_exception_handler,
)
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger("task-tracker")


def configure_logging() -> None:
    configured = os.getenv("LOG_LEVEL")
    raw_level = (configured if configured is not None else "INFO").strip().upper()
    known_levels = logging.getLevelNamesMapping()
    logger.setLevel(known_levels.get(raw_level, logging.INFO))
    logger.propagate = False
    if not logger.handlers:
        formatter = logging.Formatter("%(asctime)s %(levelname)s %(name)s: %(message)s")
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        logger.addHandler(stream_handler)

        log_dir = Path(__file__).resolve().parent / "logs"
        log_dir.mkdir(exist_ok=True)
        file_handler = logging.FileHandler(log_dir / "app.log", encoding="utf-8")
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

    if raw_level not in known_levels:
        logger.warning("Неизвестный LOG_LEVEL=%s, используется INFO", configured)


def mirror_server_logs_to_file() -> None:
    file_handler = next(
        (handler for handler in logger.handlers if isinstance(handler, logging.FileHandler)),
        None,
    )
    if file_handler is None:
        return
    for name in ("uvicorn", "uvicorn.access"):
        server_logger = logging.getLogger(name)
        if file_handler not in server_logger.handlers:
            server_logger.addHandler(file_handler)


configure_logging()


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    mirror_server_logs_to_file()
    logger.info("Сервис запущен, версия %s", os.getenv("APP_VERSION", "0.1.0"))
    yield
    logger.info("Сервис остановлен")


app = FastAPI(lifespan=lifespan)


@app.exception_handler(StarletteHTTPException)
async def log_http_exception(request: Request, exc: StarletteHTTPException) -> Response:
    message = "Запрос отклонён: %s %s, статус %s, результат=%s"
    if exc.status_code >= 500:
        logger.error(message, request.method, request.url.path, exc.status_code, exc.detail)
    else:
        logger.warning(message, request.method, request.url.path, exc.status_code, exc.detail)
    return await http_exception_handler(request, exc)


@app.exception_handler(RequestValidationError)
async def log_validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
    logger.warning(
        "Ошибка проверки данных: %s %s, результат=%s",
        request.method,
        request.url.path,
        exc.errors(),
    )
    return await request_validation_exception_handler(request, exc)


@app.exception_handler(Exception)
async def log_unexpected_error(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Необработанная ошибка: %s %s, результат=%s", request.method, request.url.path, exc)
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})


Priority = Literal["low", "medium", "high"]
SortBy = Literal["priority", "due_date"]
SortOrder = Literal["asc", "desc"]
PRIORITY_RANK = {"low": 0, "medium": 1, "high": 2}


class TaskCreate(BaseModel):
    title: str
    priority: Priority = "medium"
    due_date: date

    @field_validator("title")
    @classmethod
    def title_must_not_be_blank(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("title must not be empty")
        return stripped


class Task(BaseModel):
    id: int
    title: str
    priority: Priority
    due_date: date
    done: bool = False


tasks: dict[int, Task] = {}
next_task_id = 1


def clear_tasks() -> None:
    global next_task_id
    tasks.clear()
    next_task_id = 1


def find_task(task_id: int) -> Task:
    task = tasks.get(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": os.getenv("APP_NAME", "task-tracker"),
        "audience": "личный список задач через HTTP API",
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/version")
def version() -> dict[str, str]:
    return {"version": os.getenv("APP_VERSION", "0.1.0")}


@app.get("/tasks")
def list_tasks(
    priority: Priority | None = Query(
        default=None,
        description="Если задан, в ответе только задачи с этим приоритетом",
    ),
    sort_by: SortBy | None = Query(
        default=None,
        description="priority — по приоритету, due_date — по сроку. Без параметра порядок создания",
    ),
    order: SortOrder | None = Query(
        default=None,
        description="asc — по возрастанию, desc — по убыванию. Только вместе с sort_by; без order сортировка по возрастанию",
    ),
) -> list[Task]:
    if order is not None and sort_by is None:
        raise HTTPException(status_code=422, detail="order requires sort_by")
    selected = [
        task for task in tasks.values() if priority is None or task.priority == priority
    ]
    if sort_by == "priority":
        selected.sort(key=lambda task: PRIORITY_RANK[task.priority], reverse=order == "desc")
    elif sort_by == "due_date":
        selected.sort(key=lambda task: task.due_date, reverse=order == "desc")
    logger.info("Запрошен список задач, результат=%s", len(selected))
    return selected


@app.post("/tasks", status_code=201)
def create_task(payload: TaskCreate) -> Task:
    global next_task_id
    task = Task(
        id=next_task_id,
        title=payload.title,
        priority=payload.priority,
        due_date=payload.due_date,
    )
    tasks[task.id] = task
    next_task_id += 1
    logger.info("Задача создана, id=%s, результат=создана", task.id)
    return task


@app.get("/tasks/{task_id}")
def get_task(task_id: int) -> Task:
    task = find_task(task_id)
    logger.info("Запрошена задача, id=%s, результат=найдена", task.id)
    return task


@app.patch("/tasks/{task_id}")
def complete_task(task_id: int) -> Task:
    task = find_task(task_id)
    task.done = True
    logger.info("Задача отмечена выполненной, id=%s, результат=выполнена", task.id)
    return task


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int) -> Response:
    find_task(task_id)
    del tasks[task_id]
    logger.info("Задача удалена, id=%s, результат=удалена", task_id)
    return Response(status_code=204)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=int(os.getenv("PORT", "8000")))
