"""Containers module."""

from dependency_injector import containers, providers

from services.user_service import UserService


class Container(containers.DeclarativeContainer):
    user_service = providers.Singleton(
        UserService
    )
