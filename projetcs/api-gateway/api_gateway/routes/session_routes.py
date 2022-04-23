from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from dependencies import Container
from clients.user_client import UserClient

router = APIRouter()


@router.get("/sessions/me")
@inject
async def login(request: Request,
                user_client: UserClient = Depends(Provide(Container.user_client))):
    current_user = request.session['user']
    user = await user_client.get(current_user['provider'], current_user['username'])
    return user
