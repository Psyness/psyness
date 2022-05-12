import json
from uuid import UUID

import httpx

from configs.settings import Settings
from dto.appointment_dto import EventListDto, EventDto, CreateEventDto, UpdateEventStatusDto, ContractorEventListDto


class AppointmentClient:

    def __init__(self, settings: Settings):
        self._event_service_url = settings.event_service_url

    async def find_events(self, user_id: str) -> EventListDto:
        r = httpx.get(f'{self._event_service_url}/users/{user_id}/events')
        return EventListDto(**json.loads(r.content), user_id=user_id)

    async def find_contractor_events(self, user_id, contractor_id):
        r = httpx.get(f'{self._event_service_url}/users/{user_id}/contractor-events/{contractor_id}')
        return ContractorEventListDto(**json.loads(r.content), user_id=user_id)

    async def create_event(self, user_id, event: CreateEventDto) -> EventDto:
        r = httpx.post(f'{self._event_service_url}/users/{user_id}/events', content=event.json())
        return EventDto.parse_raw(r.content)

    async def update_event_status(self, user_id: UUID, event_id: UUID, event: UpdateEventStatusDto) -> EventDto:
        r = httpx.post(f'{self._event_service_url}/users/{user_id}/events/{event_id}/statuses', content=event.json())
        return EventDto.parse_raw(r.content)
