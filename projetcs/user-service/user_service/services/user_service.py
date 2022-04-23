from models.user_model import User
from repositories.user_repository import UserRepository

users = {}


class UserService:

    def __init__(self, user_repository: UserRepository):
        self._user_repository = user_repository

    async def save(self, provider: str, username: str):
        user = User(provider=provider, username=username)
        return await self._user_repository.save(user)

    async def get(self, provider: str, username: str):
        return await self._user_repository.get(provider, username)
