from uuid import UUID, uuid4

from models.event import CreateEvent, EventStatus, Event, EventList
from repositories.event_repository import EventRepository


class EventService:

    def __init__(self, event_repository: EventRepository):
        self._event_repository = event_repository

    async def find_events(self, user_id: UUID) -> EventList:
        events = await self._event_repository.find_events(user_id)
        return EventList(events=events)

    async def save_psychologist_event(self, psychologist_id, create_event: CreateEvent) -> Event:
        event = Event(**create_event.dict(),
                      id=uuid4(),
                      status=EventStatus.PENDING,
                      psychologist_id=psychologist_id)
        return await self._event_repository.save(event)
