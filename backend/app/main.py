# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:5173",   # Vite en desarrollo
    # "https://tu‑dominio.com",  # añadirs front de producción
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],     # GET, POST, PUT… todos
    allow_headers=["*"],     # Authorization, Content-Type…
)

from app.api import predict
app.include_router(predict.router)
