from uuid import UUID, uuid4

from models.invitation_model import Invitation, InvitationStatus
from repositories.invitation_repository import InvitationRepository


class InvitationService:

    def __init__(self, invitation_repository: InvitationRepository):
        self._invitation_repository = invitation_repository

    async def get(self, id: UUID):
        return await self._invitation_repository.get(id)

    async def save(self, inviter: UUID) -> Invitation:
        invitation = Invitation(id=uuid4(), inviter=inviter, status=InvitationStatus.PENDING)
        return await self._invitation_repository.save(invitation)

    async def update_invitation_status(self, id: UUID, status: InvitationStatus):
        return await self._invitation_repository.update_status(id, status)
