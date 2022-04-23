from fastapi import APIRouter

router = APIRouter()

users = {}


@router.get("/providers/{provider}/users/{username}")
async def get(provider: str, username: str):
    return users.get(f'{provider}|{username}')


@router.post("/providers/{provider}/users/{username}")
async def save(provider: str, username: str):
    print(f'User saved. Provider: {provider} Username: {username}')
    key = f'{provider}|{username}'
    user = users.get(key)

    if not user:
        user = {'username': username, 'provider': provider}
        users[f'{provider}|{username}'] = user

    return user
