from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from auth.auth import secure
from clients.appointment_client import AppointmentClient
from dependencies import Container
from dto.appointment_dto import CreateEventDto

router = APIRouter()


@router.get("/events")
@secure()
@inject
async def find_events(request: Request,
                      appointment_client: AppointmentClient = Depends(Provide(Container.appointment_client))):
    current_user = request.session['user']
    events = await appointment_client.find_events(current_user['id'])
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
