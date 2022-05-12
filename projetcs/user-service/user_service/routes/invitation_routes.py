from uuid import UUID

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from dependencies import Container
from models.invitation_model import Invitation, InvitationStatus
from services.contract_service import ContractService
from services.invitation_service import InvitationService

router = APIRouter()


@router.post("/users/{inviter}/invitations")
@inject
async def create_invitation(
        inviter: UUID,
        invitation_service: InvitationService = Depends(Provide[Container.invitation_service])) -> Invitation:
    return await invitation_service.save(inviter)


@router.post("/users/{client_id}/invitations/{invitation_id}")
@inject
async def accept_invitation(
        client_id: UUID,
        invitation_id: UUID,
        invitation_service: InvitationService = Depends(Provide[Container.invitation_service]),
        contract_service: ContractService = Depends(Provide[Container.contract_service])) -> Invitation:
    invitation = await invitation_service.get(invitation_id)
    await contract_service.create_contract(invitation.inviter, client_id)
    return await invitation_service.update_invitation_status(invitation_id, InvitationStatus.APPROVED)
