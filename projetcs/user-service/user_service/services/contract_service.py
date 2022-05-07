from uuid import UUID, uuid4

from models.contract_model import Contract
from repositories.contract_repository import ContractRepository


class ContractService:

    def __init__(self, contract_repository: ContractRepository):
        self._contract_repository = contract_repository

    async def create_contract(self, psychologist_id: UUID, client_id: UUID):
        contract = Contract(id=uuid4(), psychologist_id=psychologist_id, client_id=client_id)
        return await self._contract_repository.save(contract)
