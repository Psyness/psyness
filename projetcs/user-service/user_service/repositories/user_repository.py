from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine
from sqlalchemy.sql import select

from models.user_model import users_table


class UserRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def save(self, provider, username):
        with self._engine.connect() as conn:
            query = insert(users_table) \
                .values(username=username, provider=provider) \
                .on_conflict_do_update(index_elements=['username', 'provider'], set_={'username': username}) \
                .returning(users_table)

            user = conn.execute(query)
            return user.first()

    async def get(self, provider, username):
        with self._engine.connect() as conn:
            query = select(users_table) \
                .where(users_table.c.username == username) \
                .where(users_table.c.provider == provider)
            user = conn.execute(query)
            return user.first()
