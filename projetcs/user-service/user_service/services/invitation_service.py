from uuid import UUID, uuid4

from models.invitation_model import Invitation, InvitationStatus
from repositories.user_repository import UserRepository


class InvitationService:

    def __init__(self, invitation_repository: UserRepository):
        self._invitation_repository = invitation_repository

    async def save(self, inviter: UUID) -> Invitation:
        invitation = Invitation(id=uuid4(), inviter=inviter, status=InvitationStatus.PENDING)
        return await self._invitation_repository.save(invitation)
