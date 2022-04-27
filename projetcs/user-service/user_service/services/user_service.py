from dto.user_dto import UserDto, CreateUserDto
from models.user_model import UserRole
from repositories.user_repository import UserRepository


class UserService:

    def __init__(self, user_repository: UserRepository):
        self._user_repository = user_repository

    async def save_psychologist(self, provider: str, username: str, create_user_dto: CreateUserDto) -> UserDto:
        user = UserDto(**create_user_dto.dict(), roles=[UserRole.PSYCHOLOGIST])
        return await self._user_repository.save(provider, username, user)

    async def get(self, provider: str, username: str) -> UserDto:
        return await self._user_repository.get(provider, username)
