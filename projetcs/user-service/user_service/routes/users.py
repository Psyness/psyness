from fastapi import APIRouter

router = APIRouter()


@router.get("/providers/{provider}/users/{username}")
async def login(provider: str, username: str):
    return {
        'username': username,
        'provider': provider
    }
