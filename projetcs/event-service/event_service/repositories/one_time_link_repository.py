from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine
from sqlalchemy.sql import select
from sqlalchemy import update

from tables.one_time_link_table import one_time_link_table


class OneTimeLinkRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def save(self, one_time_link):
        with self._engine.connect() as conn:
            query = insert(one_time_link_table) \
                .values(id=one_time_link.id,
                        psychologist_id=one_time_link.psychologist_id,
                        is_used=one_time_link.is_used) \
                .returning(one_time_link_table)

            user = conn.execute(query)
            return user.first()

    async def get(self, one_time_link_id):
        with self._engine.connect() as conn:
            query = select(one_time_link_table) \
                .where(one_time_link_table.c.id == one_time_link_id)
            user = conn.execute(query)
            return user.first()

    async def set_used_by_id(self, one_time_link_id):
        with self._engine.connect() as conn:
            query = update(one_time_link_table) \
                .values(is_used=True) \
                .where(one_time_link_table.c.id == one_time_link_id) \
                .returning(one_time_link_table)
            invitation = conn.execute(query)
            return invitation.first()
