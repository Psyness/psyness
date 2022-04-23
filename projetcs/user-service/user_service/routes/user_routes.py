from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from dependencies import Container
from services.user_service import UserService

router = APIRouter()


@router.get("/providers/{provider}/users/{username}")
@inject
async def get(provider: str,
              username: str,
              user_service: UserService = Depends(Provide[Container.user_service])):
    return await user_service.get(provider, username)


@router.post("/providers/{provider}/users/{username}")
@inject
async def save(provider: str,
               username: str,
               user_service: UserService = Depends(Provide[Container.user_service])):
    return await user_service.save(provider, username)
