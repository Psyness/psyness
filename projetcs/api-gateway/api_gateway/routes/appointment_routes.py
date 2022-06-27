from uuid import UUID

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from auth.auth import secure
from clients.appointment_client import AppointmentClient
from dependencies import Container
from dto.appointment_dto import CreateEventDto, UpdateEventStatusDto

router = APIRouter()


@router.get("/events")
@secure()
@inject
async def find_events(request: Request,
                      start_time: int,
                      end_time: int,
                      appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))):
    current_user = request.session['user']
    events = await appointment_client.find_events(current_user['id'], start_time, end_time)
    return events


@router.get("/contractor-events/{contractor_id}")
@secure()
@inject
async def find_events(request: Request,
                      contractor_id: UUID,
                      start_time: int,
                      end_time: int,
                      appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))):
    current_user = request.session['user']
    events = await appointment_client.find_contractor_events(current_user['id'], contractor_id, start_time, end_time)
    return events


@router.post("/events")
@secure()
@inject
async def create_event(request: Request,
                       event: CreateEventDto,
                       appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))):
    current_user = request.session['user']
    event = await appointment_client.create_event(current_user['id'], event)
    return event


@router.post("/events/{event_id}/statuses")
@secure()
@inject
async def update_event_status(request: Request,
                              event_id: UUID,
                              event_status_dto: UpdateEventStatusDto,
                              appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))):
    current_user = request.session['user']
    return await appointment_client.update_event_status(current_user['id'], event_id, event_status_dto)


@router.post("/events/one-time-link")
@secure()
@inject
async def create_one_time_appointment_link(
        request: Request,
        appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))):
    current_user = request.session['user']
    return await appointment_client.create_one_time_appointment_link(current_user['id'])
