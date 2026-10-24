import os
from datetime import date
from typing import Literal

import uvicorn
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, field_validator

app = FastAPI()

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
    return task


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=int(os.getenv("PORT", "8000")))
