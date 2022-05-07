from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine

from models.contract_model import Contract
from models.invitation_model import Invitation
from tables.contract_table import app_user_contract_table


class ContractRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def save(self, contract: Contract) -> Invitation:
        with self._engine.connect() as conn:
            query = insert(app_user_contract_table) \
                .values(id=contract.id,
                        psychologist_id=contract.psychologist_id,
                        client_id=contract.client_id) \
                .returning(app_user_contract_table)

            saved_contract = conn.execute(query)
            return saved_contract.first()
