from uuid import UUID

from pydantic import BaseModel


class OneTimeLink(BaseModel):
    id: UUID
    psychologist_id: UUID
    is_used: bool
