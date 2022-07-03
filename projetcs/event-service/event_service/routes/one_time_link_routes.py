from uuid import UUID

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends, HTTPException

from dependencies import Container
from models.event import CreateEvent, Event, ContractorEventList
from models.one_time_link import OneTimeLink
from services.event_service import EventService
from services.one_time_link_service import OneTimeLinkService

router = APIRouter()


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


@router.post("/one-time-link/{one_time_link_id}/events")
@inject
async def create_event_by_one_time_link(
        one_time_link_id: UUID,
        event: CreateEvent,
        one_time_link_service: OneTimeLinkService = Depends(Provide[Container.one_time_link_service]),
        event_service: EventService = Depends(Provide[Container.event_service])
) -> Event:
    link: OneTimeLink = await one_time_link_service.get(one_time_link_id)
    if link.is_used:
        raise HTTPException(400, detail="LINK_IS_ALREADY_USED")

    saved_event = await event_service.save_event(link.psychologist_id, event)
    await one_time_link_service.invalidate_link(one_time_link_id)
    return saved_event
