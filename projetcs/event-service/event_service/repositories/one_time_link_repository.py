from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine

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
