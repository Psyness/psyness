from enum import Enum
from typing import List, Optional

from pydantic import BaseModel


class EventStatus(str, Enum):
    PENDING = 'PENDING'
    APPROVED = 'APPROVED'
    CANCELLED = 'CANCELLED'


class EventAttendee(BaseModel):
    uuid: str
    status: EventStatus


class EventDto(BaseModel):
    id: str
    title: str
    start_time: int
    end_time: int
    initiator: str
    attendees: List[EventAttendee]


class EventListDto(BaseModel):
    user_id: str
    events: List[EventDto]


class CreateEventDto(BaseModel):
    title: str
    attendee_id: str
    start_time: int
    end_time: int


class UpdateEventStatusDto(BaseModel):
    status: EventStatus


class ContractorEventDto(BaseModel):
    id: Optional[str]
    title: str
    start_time: int
    end_time: int
    initiator: Optional[str]
    attendees: List[EventAttendee]


class ContractorEventListDto(BaseModel):
    user_id: str
    events: List[ContractorEventDto]
