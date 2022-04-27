import httpx

from configs.settings import Settings
from dto.user_dto import UserDto, CreateUserDto


class UserClient:

    def __init__(self, settings: Settings):
        self._user_service_url = settings.user_service_url

    async def get(self, provider: str, username: str) -> UserDto:
        r = httpx.get(f'{self._user_service_url}/providers/{provider}/users/{username}')
        return UserDto.parse_raw(r.content)

    async def save_or_get(self, user: CreateUserDto) -> UserDto:
        r = httpx.post(url=f'{self._user_service_url}/providers/{user.provider}/users/{user.username}/psychologists',
                       content=user.json())
        return UserDto.parse_raw(r.content.decode('utf-8'))
