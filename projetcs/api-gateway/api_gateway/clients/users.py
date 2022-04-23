import json

import httpx
from config.settings import settings


def get_user(provider: str, username: str):
    r = httpx.get(f'{settings.user_service_url}/providers/provider/users/user')
    return json.loads(r.content)
