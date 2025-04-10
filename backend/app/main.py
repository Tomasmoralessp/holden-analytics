from fastapi import FastAPI
from app.api.predict import router as predict_router

app = FastAPI(title="Holden Analytics MVP")
app.include_router(predict_router, prefix="/api")