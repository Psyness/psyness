from uuid import UUID

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends

from dependencies import Container
from models.event import CreateEvent, EventList, Event, UpdateEventStatus, ContractorEventList
from models.one_time_link import OneTimeLink
from services.event_service import EventService
from services.one_time_link_service import OneTimeLinkService

router = APIRouter()


@router.get("/users/{user_id}/events")
@inject
async def get_events(user_id: UUID,
                     start_time: int,
                     end_time: int,
                     event_service: EventService = Depends(Provide[Container.event_service])) -> EventList:
    return await event_service.find_events(user_id, start_time, end_time)


@router.get("/users/{user_id}/contractor-events/{contractor_id}")
@inject
async def get_contractor_events(user_id: UUID,
                                start_time: int,
                                end_time: int,
                                contractor_id: UUID,
                                event_service: EventService = Depends(
                                    Provide[Container.event_service])) -> ContractorEventList:
    return await event_service.find_contractor_events(user_id, contractor_id, start_time, end_time)


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


@router.post("/users/{user_id}/one-time-link")
@inject
async def create_one_time_link(
        user_id: UUID,
        one_time_link_service: OneTimeLinkService = Depends(Provide[Container.one_time_link_service])
):
    return await one_time_link_service.create(user_id)


@router.get("/one-time-link/{one_time_link_id}/events")
@inject
async def create_one_time_link(
        one_time_link_id: UUID,
        start_time: int,
        end_time: int,
        one_time_link_service: OneTimeLinkService = Depends(Provide[Container.one_time_link_service]),
        event_service: EventService = Depends(Provide[Container.event_service])
):
    link: OneTimeLink = await one_time_link_service.get(one_time_link_id)
    events: ContractorEventList = await event_service \
        .find_contractor_events(None, link.psychologist_id, start_time=start_time, end_time=end_time)

    return {'events': events.events, 'user_id': link.psychologist_id}
