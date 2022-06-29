from uuid import UUID

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from auth.auth import secure
from clients.appointment_client import AppointmentClient
from dependencies import Container
from dto.appointment_dto import CreateEventDto

router = APIRouter()

@router.post("/one-time-link")
@secure()
@inject
async def create_one_time_appointment_link(
        request: Request,
        appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))
):
    current_user = request.session['user']
    return await appointment_client.create_one_time_appointment_link(current_user['id'])


@router.get("/one-time-link/{one_time_link_id}/events")
@inject
async def create_one_time_appointment_link(
        one_time_link_id: UUID,
        start_time: int,
        end_time: int,
        appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))
):
    return await appointment_client.get_link_events(one_time_link_id, start_time, end_time)


@router.post("/one-time-link/{one_time_link_id}/events")
@inject
async def create_event_by_one_time_link(
        one_time_link_id: UUID,
        event: CreateEventDto,
        appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))
):
    return await appointment_client.create_event_by_link(one_time_link_id, event)
