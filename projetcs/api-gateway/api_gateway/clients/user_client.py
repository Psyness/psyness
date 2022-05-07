from uuid import UUID

import httpx

from configs.settings import Settings
from dto.invitation_dto import InvitationDto
from dto.user_dto import UserDto, CreateUserDto, UserListDto


class UserClient:

    def __init__(self, settings: Settings):
        self._user_service_url = settings.user_service_url

    async def get(self, provider: str, username: str) -> UserDto:
        r = httpx.get(f'{self._user_service_url}/users/{username}/providers/{provider}')
        return UserDto.parse_raw(r.content)

    async def upsert_psychologist(self, user: CreateUserDto) -> UserDto:
        r = httpx.post(url=f'{self._user_service_url}/users/{user.username}/providers/{user.provider}/psychologists',
                       content=user.json())
        return UserDto.parse_raw(r.content.decode('utf-8'))

    async def find_clients(self, psychologist_id: UUID):
        r = httpx.get(url=f'{self._user_service_url}/users/{psychologist_id}/clients')
        return UserListDto.parse_raw(r.content.decode('utf-8'))

    async def create_invitation(self, psychologist_id: UUID):
        r = httpx.post(url=f'{self._user_service_url}/users/{psychologist_id}/invitations')
        return InvitationDto.parse_raw(r.content.decode('utf-8'))
