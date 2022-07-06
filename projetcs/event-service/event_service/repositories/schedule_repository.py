from uuid import UUID

from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine
from sqlalchemy.sql import select

from models.schedule import CreateUserSchedule, UserSchedule
from tables.schedule_table import user_schedule_table


class ScheduleRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def get(self, psychologist_id: UUID) -> UserSchedule:
        with self._engine.connect() as conn:
            query = select(user_schedule_table) \
                .where(user_schedule_table.c.psychologist_id == psychologist_id)
            user = conn.execute(query)
            return user.first()

    async def save(self, psychologist_id: UUID, schedule: CreateUserSchedule) -> UserSchedule:
        weeks = {'weeks': [week.json() for week in schedule.weeks]}
        with self._engine.connect() as conn:
            query = insert(user_schedule_table) \
                .values(psychologist_id=psychologist_id,
                        start_time=schedule.start_time,
                        type=schedule.type,
                        schedule=weeks) \
                .returning(user_schedule_table)
            query = query.on_conflict_do_update(index_elements=['psychologist_id'], set_={
                'start_time': query.excluded.start_time,
                'type': query.excluded.type,
                'schedule': query.excluded.schedule
            })
            saved_schedule = conn.execute(query)
            return saved_schedule.first()
