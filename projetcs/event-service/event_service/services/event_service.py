from uuid import UUID, uuid4

from models.event import CreateEvent, EventStatus, Event, EventList, UpdateEventStatus, EventAttendee, \
    ContractorEventList
from repositories.event_repository import EventRepository


class EventService:

    def __init__(self, event_repository: EventRepository):
        self._event_repository = event_repository

    async def find_events(self, user_id: UUID) -> EventList:
        events = await self._event_repository.find_events(user_id)
        return EventList(events=events)

    async def find_contractor_events(self, user_id: UUID, contractor_id: UUID) -> ContractorEventList:
        raw_events = await self._event_repository.find_events(contractor_id)
        adjusted_events = [self._adjust_event(event, user_id) for event in raw_events]
        return ContractorEventList(events=adjusted_events)

    def _adjust_event(self, event, user_id: UUID):
        attendee_uuids = [attendee.get('uuid') for attendee in event.attendees]
        if user_id in attendee_uuids:
            return event

        return {
            'title': 'Busy',
            'start_time': event.start_time,
            'end_time': event.end_time,
            'attendees': []
        }

    async def save_event(self, user_id, create_event: CreateEvent) -> Event:
        attendees = [
            EventAttendee(uuid=create_event.attendee_id, status=EventStatus.PENDING),
            EventAttendee(uuid=user_id, status=EventStatus.APPROVED),
        ]
        event = Event(id=uuid4(),
                      title=create_event.title,
                      start_time=create_event.start_time,
                      end_time=create_event.end_time,
                      initiator=user_id,
                      attendees=attendees)
        saved_event = await self._event_repository.save(event)
        return Event(**saved_event)

    async def update_event_status(self, user_id: UUID, event_id: UUID, update_event: UpdateEventStatus) -> Event:
        event = await self._event_repository.update_status(user_id, event_id, update_event.status)
        return Event(**event)
