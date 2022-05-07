from uuid import UUID

from pydantic import BaseModel


class Contract(BaseModel):
    id: UUID
    psychologist_id: UUID
    client_id: UUID
