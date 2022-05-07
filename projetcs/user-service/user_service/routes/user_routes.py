from uuid import UUID

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, HTTPException

from dependencies import Container
from dto.user_dto import CreateUserDto
from models.invitation_model import Invitation, InvitationStatus
from models.user_model import User
from services.contract_service import ContractService
from services.invitation_service import InvitationService
from services.user_service import UserService

router = APIRouter()


@router.get("/users/{username}/providers/{provider}")
@inject
async def get(provider: str,
              username: str,
              user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    user = await user_service.get(provider, username)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.post("/users/{username}/providers/{provider}/psychologists")
@inject
async def save_psychologist(provider: str,
                            username: str,
                            user: CreateUserDto,
                            user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    return await user_service.save_psychologist(provider, username, user)


@router.post("/users/{username}/providers/{provider}/clients")
@inject
async def save_client(provider: str,
                      username: str,
                      user: CreateUserDto,
                      user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    return await user_service.save_client(provider, username, user)


@router.post("/users/{inviter}/invitations")
@inject
async def create_invitation(
        inviter: UUID,
        invitation_service: InvitationService = Depends(Provide[Container.invitation_service])
) -> Invitation:
    return await invitation_service.save(inviter)


@router.post("/users/{client_id}/invitations/{invitation_id}")
@inject
async def accept_invitation(
        client_id: UUID,
        invitation_id: UUID,
        invitation_service: InvitationService = Depends(Provide[Container.invitation_service]),
        contract_service: ContractService = Depends(Provide[Container.contract_service])
) -> Invitation:
    invitation = await invitation_service.get(invitation_id)
    await contract_service.create_contract(invitation.inviter, client_id)
    return await invitation_service.update_invitation_status(invitation_id, InvitationStatus.APPROVED)


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
