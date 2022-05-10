"""Containers module."""

from dependency_injector import containers, providers
from sqlalchemy import create_engine

from configs.settings import Settings
from repositories.event_repository import EventRepository
from services.event_service import EventService


class Container(containers.DeclarativeContainer):
    settings = Settings()
    database_url = f'postgresql://{settings.database_user}:{settings.database_password}' \
                   f'@{settings.database_url}:{settings.database_port}' \
                   f'/{settings.database_name}'

    engine = providers.Singleton(
        create_engine,
        database_url
    )

    event_repository = providers.Singleton(
        EventRepository,
        engine=engine
    )

    event_service = providers.Singleton(
        EventService,
        event_repository=event_repository
    )
