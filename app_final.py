import os

import uvicorn
from fastapi import FastAPI

app = FastAPI()


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


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=int(os.getenv("PORT", "8000")))
