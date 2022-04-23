import json

import httpx

from configs.settings import Settings


class UserClient:

    def __init__(self, settings: Settings):
        self._settings = settings

    async def get(self, provider: str, username: str):
        r = httpx.get(f'{self._settings.user_service_url}/providers/{provider}/users/{username}')
        return json.loads(r.content)

    async def save_or_get(self, provider: str, username: str):
        r = httpx.post(f'{self._settings.user_service_url}/providers/{provider}/users/{username}')
        return json.loads(r.content)
