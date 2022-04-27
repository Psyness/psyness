from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from dependencies import Container
from dto.user_dto import UserDto, CreateUserDto
from services.user_service import UserService

router = APIRouter()


@router.get("/providers/{provider}/users/{username}")
@inject
async def get(provider: str,
              username: str,
              user_service: UserService = Depends(Provide[Container.user_service])) -> UserDto:
    return await user_service.get(provider, username)


@router.post("/providers/{provider}/users/{username}/psychologists")
@inject
async def save_psychologist(provider: str,
                            username: str,
                            user: CreateUserDto,
                            user_service: UserService = Depends(Provide[Container.user_service])) -> UserDto:
    return await user_service.save_psychologist(provider, username, user)
