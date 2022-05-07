from uuid import uuid4

from dto.user_dto import CreateUserDto
from models.user_model import UserRole, User
from repositories.user_repository import UserRepository


class UserService:

    def __init__(self, user_repository: UserRepository):
        self._user_repository = user_repository

    async def save_psychologist(self, provider: str, username: str, create_user_dto: CreateUserDto) -> User:
        user = User(**create_user_dto.dict(), roles=[UserRole.PSYCHOLOGIST], id=uuid4())
        return await self._user_repository.save(provider, username, user)

    async def save_client(self, provider: str, username: str, create_user_dto: CreateUserDto) -> User:
        user = User(**create_user_dto.dict(), roles=[UserRole.CLIENT], id=uuid4())
        return await self._user_repository.save(provider, username, user)

    async def get(self, provider: str, username: str) -> User:
        return await self._user_repository.get(provider, username)
