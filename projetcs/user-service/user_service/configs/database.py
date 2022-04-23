from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from configs.settings import Settings

settings = Settings()

SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_user}:{settings.database_password}' \
                          f'@{settings.database_url}:{settings.database_port}' \
                          f'/{settings.database_name}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
