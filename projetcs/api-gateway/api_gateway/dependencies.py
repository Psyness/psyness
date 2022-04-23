"""Containers module."""

from dependency_injector import containers, providers

from clients.google_client import GoogleClient
from clients.user_client import UserClient
from configs.settings import Settings


class Container(containers.DeclarativeContainer):
    settings = providers.Singleton(
        Settings
    )

    google_client = providers.Singleton(
        GoogleClient,
        settings=settings
    )

    user_client = providers.Singleton(
        UserClient,
        settings=settings
    )
