import time
from uuid import uuid4

from dependency_injector.wiring import inject
from fastapi import APIRouter

router = APIRouter()

events = [
    {
        'id': uuid4(),
        'psychologist_id': '123',
        'client_id': '123',
        'status': 'PENDING',
        'start_time': round(time.time() * 1000),
        'end_time': round(time.time() * 1000) + 3600000,
        'title': 'title'
    }
]


@router.get("/users/{user_id}/events")
@inject
async def get_events(user_id: str):
    return {
        'events': events
    }


@router.post("/users/{user_id}/events")
async def save_events(user_id: str, event: dict):
    appointment = {**event, 'client_id': '123', 'psychologist_id': user_id, 'status': 'PENDING', 'id': uuid4()}
    events.append(appointment)
    return appointment
