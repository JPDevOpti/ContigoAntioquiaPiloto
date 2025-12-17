from collections.abc import AsyncGenerator
from app.core.database import get_session


async def get_db() -> AsyncGenerator:
    async for session in get_session():
        yield session

