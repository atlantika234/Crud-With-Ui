from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://0.0.0.0:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # разрешённые адреса фронта
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
