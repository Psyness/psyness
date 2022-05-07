from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class InvitationStatus(str, Enum):
    PENDING = 'PENDING'
    CANCELLED = 'CANCELLED'
    APPROVED = 'APPROVED'


class Invitation(BaseModel):
    id: UUID
    inviter: UUID
    status: InvitationStatus
