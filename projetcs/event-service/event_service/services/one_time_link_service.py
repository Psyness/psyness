from uuid import UUID, uuid4

from models.one_time_link import OneTimeLink
from repositories.one_time_link_repository import OneTimeLinkRepository


class OneTimeLinkService:

    def __init__(self, one_time_link_repository: OneTimeLinkRepository):
        self._one_time_link_repository = one_time_link_repository

    async def create_one_time_link(self, user_id: UUID) -> OneTimeLink:
        link = OneTimeLink(id=uuid4(), psychologist_id=user_id, is_used=False)
        return await self._one_time_link_repository.save(link)
