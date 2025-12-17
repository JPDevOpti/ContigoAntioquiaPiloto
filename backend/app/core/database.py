from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

Base = declarative_base()


engine = create_async_engine(settings.database_url, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, autoflush=False, autocommit=False)


async def get_session() -> AsyncSession:
    session = SessionLocal()
    try:
        yield session
    finally:
        await session.close()

