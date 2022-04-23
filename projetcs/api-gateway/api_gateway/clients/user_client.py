import json

import httpx

from configs.settings import settings


async def get(provider: str, username: str):
    r = httpx.get(f'{settings.user_service_url}/providers/{provider}/users/{username}')
    return json.loads(r.content)


async def save_or_get(provider: str, username: str):
    r = httpx.post(f'{settings.user_service_url}/providers/{provider}/users/{username}')
    return json.loads(r.content)
