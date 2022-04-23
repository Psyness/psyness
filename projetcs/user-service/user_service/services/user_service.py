from repositories.user_repository import UserRepository


class UserService:

    def __init__(self, user_repository: UserRepository):
        self._user_repository = user_repository

    async def save(self, provider: str, username: str):
        return await self._user_repository.save(username, provider)

    async def get(self, provider: str, username: str):
        return await self._user_repository.get(provider, username)
