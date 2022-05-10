from enum import Enum
from typing import List

from pydantic import BaseModel


class AppointmentStatus(str, Enum):
    PENDING = 'PENDING'
    APPROVED = 'APPROVED'
    CANCELLED = 'CANCELLED'


class EventDto(BaseModel):
    id: str
    title: str
    start_time: int
    end_time: int
    status: AppointmentStatus
    psychologist_id: str
    client_id: str
    initiator: str


class EventListDto(BaseModel):
    events: List[EventDto]


class CreateEventDto(BaseModel):
    title: str
    client_id: str
    start_time: int
    end_time: int


class UpdateEventStatusDto(BaseModel):
    status: AppointmentStatus
