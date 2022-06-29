from uuid import UUID, uuid4

from models.one_time_link import OneTimeLink
from repositories.one_time_link_repository import OneTimeLinkRepository


class OneTimeLinkService:

    def __init__(self, one_time_link_repository: OneTimeLinkRepository):
        self._one_time_link_repository = one_time_link_repository

    async def create(self, user_id: UUID) -> OneTimeLink:
        link = OneTimeLink(id=uuid4(), psychologist_id=user_id, is_used=False)
        return await self._one_time_link_repository.save(link)

    async def get(self, one_time_link_id):
        return await self._one_time_link_repository.get(one_time_link_id)

    async def invalidate_link(self, one_time_link_id):
        return await self._one_time_link_repository.set_used_by_id(one_time_link_id)
