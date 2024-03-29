"""Containers module."""

from dependency_injector import containers, providers
from sqlalchemy import create_engine

from configs.settings import Settings
from repositories.contract_repository import ContractRepository
from repositories.invitation_repository import InvitationRepository
from repositories.user_repository import UserRepository
from services.contract_service import ContractService
from services.invitation_service import InvitationService
from services.user_service import UserService


class Container(containers.DeclarativeContainer):
    settings = Settings()
    database_url = f'postgresql://{settings.database_user}:{settings.database_password}' \
                   f'@{settings.database_url}:{settings.database_port}' \
                   f'/{settings.database_name}'

    engine = providers.Singleton(
        create_engine,
        database_url
    )

    user_repository = providers.Singleton(
        UserRepository,
        engine=engine
    )

    user_service = providers.Singleton(
        UserService,
        user_repository=user_repository
    )

    invitation_repository = providers.Singleton(
        InvitationRepository,
        engine=engine
    )

    invitation_service = providers.Singleton(
        InvitationService,
        invitation_repository=invitation_repository
    )

    contract_repository = providers.Singleton(
        ContractRepository,
        engine=engine
    )

    contract_service = providers.Singleton(
        ContractService,
        contract_repository=contract_repository
    )
