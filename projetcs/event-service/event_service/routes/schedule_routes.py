from uuid import UUID

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends

from dependencies import Container
from models.schedule import CreateUserSchedule
from services.shcedule_service import ScheduleService

router = APIRouter()


@router.post("/users/{psychologist_id}/schedules")
@inject
async def create_schedule(
        psychologist_id: UUID,
        schedule: CreateUserSchedule,
        schedule_service: ScheduleService = Depends(Provide[Container.schedule_service])
):
    return await schedule_service.create(psychologist_id, schedule)
