from uuid import UUID

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from models.event import CreateEvent, EventList, Event, UpdateEventStatus
from services.event_service import EventService

from dependencies import Container

router = APIRouter()


@router.get("/users/{user_id}/events")
@inject
async def get_events(user_id: UUID,
                     event_service: EventService = Depends(Provide[Container.event_service])) -> EventList:
    return await event_service.find_events(user_id)


@router.post("/users/{user_id}/events")
@inject
async def save_events(user_id: UUID,
                      event: CreateEvent,
                      event_service: EventService = Depends(Provide[Container.event_service])) -> Event:
    return await event_service.save_event(user_id, event)


@router.post("/users/{user_id}/events/{event_id}/statuses")
@inject
async def save_events(user_id: UUID,
                      event_id: UUID,
                      event: UpdateEventStatus,
                      event_service: EventService = Depends(Provide[Container.event_service])) -> Event:
    return await event_service.update_event_status(user_id, event_id, event)
