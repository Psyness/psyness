from sqlalchemy import or_
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine
from sqlalchemy.sql import select

from models.user_model import User
from tables.contract_table import app_user_contract_table
from tables.user_table import users_table


class UserRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def save(self, provider: str, username: str, user: User):
        with self._engine.connect() as conn:
            query = insert(users_table) \
                .values(id=user.id,
                        username=username,
                        provider=provider,
                        last_name=user.last_name,
                        first_name=user.first_name,
                        roles=user.roles) \
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

    async def find_clients(self, **kwargs):
        psychologist_id = kwargs['psychologist_id']
        query = kwargs['filter']
        with self._engine.connect() as conn:
            clients_query = select(users_table) \
                .join(app_user_contract_table, app_user_contract_table.c.client_id == users_table.c.id) \
                .where(app_user_contract_table.c.psychologist_id == psychologist_id)

            if query:
                clients_query = clients_query.where(or_(
                    users_table.c.first_name.ilike(f'{query}%'),
                    users_table.c.last_name.ilike(f'{query}%'),
                ))

            clients = conn.execute(clients_query)
            return clients.all()

    async def find_psychologists(self, **kwargs):
        client_id = kwargs['client_id']
        query = kwargs['filter']
        with self._engine.connect() as conn:
            psychologist_query = select(users_table) \
                .join(app_user_contract_table, app_user_contract_table.c.psychologist_id == users_table.c.id) \
                .where(app_user_contract_table.c.client_id == client_id)

            if query:
                psychologist_query = psychologist_query.where(or_(
                    users_table.c.first_name.ilike(f'{query}%'),
                    users_table.c.last_name.ilike(f'{query}%'),
                ))

            user = conn.execute(psychologist_query)
            return user.all()
