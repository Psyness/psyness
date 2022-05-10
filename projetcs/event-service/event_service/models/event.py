from enum import Enum
from typing import List
from uuid import UUID

from pydantic import BaseModel


class EventStatus(str, Enum):
    PENDING = 'PENDING'


class Event(BaseModel):
    id: UUID
    title: str
    status: EventStatus
    start_time: int
    end_time: int
    psychologist_id: UUID
    client_id: UUID
    initiator: UUID


class EventList(BaseModel):
    events: List[Event]


class CreateEvent(BaseModel):
    client_id: UUID
    start_time: int
    end_time: int
    title: str
