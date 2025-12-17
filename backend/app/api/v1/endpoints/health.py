from fastapi import APIRouter

router = APIRouter()


@router.get("/", summary="Revisar estado del API")
async def health_check():
    return {"status": "ok"}

