from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings

app = FastAPI(title=settings.project_name)

origins = [origin.strip() for origin in settings.allowed_origins.split(",") if origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", summary="Bienvenida")
async def root():
    return {"message": "Contigo Antioquia API", "docs": f"{settings.api_prefix}/docs"}


app.include_router(api_router, prefix=settings.api_prefix)

