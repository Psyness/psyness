"""Containers module."""

from dependency_injector import containers, providers

from configs.database import get_session
from repositories.user_repository import UserRepository
from services.user_service import UserService


class Container(containers.DeclarativeContainer):
    session = providers.Resource(
        get_session
    )

    user_repository = providers.Singleton(
        UserRepository,
        session=session
    )

    user_service = providers.Singleton(
        UserService,
        user_repository=user_repository
    )
