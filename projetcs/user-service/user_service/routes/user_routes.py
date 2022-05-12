from typing import Optional
from uuid import UUID

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, HTTPException

from dependencies import Container
from dto.user_dto import CreateUserDto
from models.user_model import User, UserList
from services.user_service import UserService

router = APIRouter()


@router.post("/users/{username}/providers/{provider}/psychologists")
@inject
async def save_psychologist(provider: str,
                            username: str,
                            user: CreateUserDto,
                            user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    return await user_service.save_psychologist(provider, username, user)


@router.post("/users/{username}/providers/{provider}/clients")
@inject
async def save_client(provider: str,
                      username: str,
                      user: CreateUserDto,
                      user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    return await user_service.save_client(provider, username, user)


@router.get("/users/{username}/providers/{provider}")
@inject
async def get(provider: str,
              username: str,
              user_service: UserService = Depends(Provide[Container.user_service])) -> User:
    user = await user_service.get(provider, username)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.get("/psychologists/{user_id}/clients")
@inject
async def find_clients(user_id: UUID,
                       query: Optional[str] = None,
                       user_service: UserService = Depends(Provide[Container.user_service])) -> UserList:
    return await user_service.find_clients(user_id, query)


@router.get("/clients/{client_id}/psychologists")
@inject
async def find_clients(client_id: UUID,
                       query: Optional[str] = None,
                       user_service: UserService = Depends(Provide[Container.user_service])) -> UserList:
    return await user_service.find_psychologists(client_id, query)
