from fastapi import APIRouter

from services import user_service

router = APIRouter()

@router.get("/providers/{provider}/users/{username}")
async def get(provider: str, username: str):
    return await user_service.get(provider, username)


@router.post("/providers/{provider}/users/{username}")
async def save(provider: str, username: str):
    return await user_service.save(provider, username)
