from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from auth.auth import secure
from clients.appointment_client import AppointmentClient
from dependencies import Container
from dto.schedule_dto import UserSchedule

router = APIRouter()


@router.get("/schedules")
@secure()
@inject
async def get_schedule(
        request: Request,
        appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))
):
    current_user = request.session['user']
    schedule = await appointment_client.get_schedule(current_user['id'])
    return schedule


@router.post("/schedules")
@secure()
@inject
async def create_schedule(request: Request,
                          schedule: UserSchedule,
                          appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))):
    current_user = request.session['user']
    saved_schedule = await appointment_client.create_schedule(current_user['id'], schedule)
    return saved_schedule
