from uuid import UUID

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from dependencies import Container
from dto.user_dto import CreateUserDto
from models.invitation_model import Invitation
from models.user_model import User
from services.invitation_service import InvitationService
from services.user_service import UserService

router = APIRouter()


@router.get("/users/{username}/providers/{provider}")
@inject
async def get(provider: str,
              username: str,
              user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    return await user_service.get(provider, username)


@router.post("/users/{username}/providers/{provider}/psychologists")
@inject
async def save_psychologist(provider: str,
                            username: str,
                            user: CreateUserDto,
                            user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    return await user_service.save_psychologist(provider, username, user)


@router.get("/users/{uuid}/clients")
@inject
async def find_users(uuid: UUID):
    return {
        'users': [
            {
                'first_name': 'name',
                'id': 'id',
                'last_name': 'last_name',
                'provider': 'GOOGLE',
                'username': 'uname',
                'roles': ['PSYCHOLOGIST']
            }
        ]
    }


@router.post("/users/{inviter}/invitations")
@inject
async def create_invitation(
        inviter: UUID,
        invitation_service: InvitationService = Depends(Provide[Container.invitation_service])
) -> Invitation:
    return await invitation_service.save(inviter)
