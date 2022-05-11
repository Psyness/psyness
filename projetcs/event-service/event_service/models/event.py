from enum import Enum
from typing import List
from uuid import UUID

from pydantic import BaseModel


class EventStatus(str, Enum):
    PENDING = 'PENDING'
    APPROVED = 'APPROVED'
    CANCELLED = 'CANCELLED'


class EventAttendee(BaseModel):
    uuid: UUID
    status: EventStatus


class Event(BaseModel):
    id: UUID
    title: str
    start_time: int
    end_time: int
    initiator: UUID
    attendees: List[EventAttendee]


class EventList(BaseModel):
    events: List[Event]


class CreateEvent(BaseModel):
    attendee_id: UUID
    start_time: int
    end_time: int
    title: str


class UpdateEventStatus(BaseModel):
    status: EventStatus
