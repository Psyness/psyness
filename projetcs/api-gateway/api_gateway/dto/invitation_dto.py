from uuid import UUID

from pydantic import BaseModel


class InvitationDto(BaseModel):
    id: str
    inviter: str
    status: str
