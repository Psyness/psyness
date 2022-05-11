from uuid import UUID

from models.event import Event, EventStatus
from sqlalchemy import select, text
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine
from tables.event_table import events_table


class EventRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def find_events(self, user_id: UUID):
        with self._engine.connect() as conn:
            query = select(events_table) \
                .where(events_table.c.attendees.op('@>')([{'uuid': str(user_id)}]))

            events = conn.execute(query)
            return events.all()

    async def save(self, event: Event):
        with self._engine.connect() as conn:
            query = insert(events_table) \
                .values(id=event.id,
                        start_time=event.start_time,
                        end_time=event.end_time,
                        title=event.title,
                        initiator=event.initiator,
                        attendees=[{'uuid': str(a.uuid), 'status': a.status} for a in event.attendees]) \
                .returning(events_table)

            user = conn.execute(query)
            return user.first()

    async def update_status(self, user_id: UUID, event_id: UUID, status: EventStatus):
        with self._engine.connect() as conn:
            statement = text("""
                WITH attendee_status AS (SELECT ('{' || index - 1 || ',status}')::TEXT[] AS path
                           FROM events,
                                jsonb_array_elements(attendees) WITH ORDINALITY arr(attendee, index)
                           WHERE id = :event_id AND attendee ->> 'uuid' = :attendee_id)
                UPDATE events
                SET attendees = jsonb_set(attendees, attendee_status.path, :status, false)
                    FROM attendee_status
                WHERE id = :event_id
                RETURNING *;
            """)

            result = conn.execute(statement, attendee_id=str(user_id), event_id=str(event_id), status=f'"{status}"')
            return result.first()
