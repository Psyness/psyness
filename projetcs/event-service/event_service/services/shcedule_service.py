from uuid import UUID

from models.schedule import CreateUserSchedule, UserSchedule
from repositories.schedule_repository import ScheduleRepository


class ScheduleService:

    def __init__(self, schedule_repository: ScheduleRepository):
        self._schedule_repository = schedule_repository

    async def create(self, psychologist_id: UUID, schedule: CreateUserSchedule) -> UserSchedule:
        return await self._schedule_repository.save(psychologist_id, schedule)

    async def get(self, psychologist_id: UUID) -> UserSchedule:
        return await self._schedule_repository.get(psychologist_id)
