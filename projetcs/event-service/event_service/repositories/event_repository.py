from uuid import UUID

from models.event import Event
from sqlalchemy import select, or_
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine
from tables.event_table import events_table


class EventRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def find_events(self, user_id: UUID):
        with self._engine.connect() as conn:
            query = select(events_table) \
                .where(or_(
                events_table.c.psychologist_id == user_id,
                events_table.c.client_id == user_id,
            ))

            events = conn.execute(query)
            return events.all()

    async def save(self, event: Event):
        with self._engine.connect() as conn:
            query = insert(events_table) \
                .values(id=event.id,
                        psychologist_id=event.psychologist_id,
                        client_id=event.client_id,
                        status=event.status,
                        start_time=event.start_time,
                        end_time=event.end_time,
                        title=event.title) \
                .returning(events_table)

            user = conn.execute(query)
            return user.first()
