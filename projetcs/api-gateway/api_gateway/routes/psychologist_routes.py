from typing import Optional

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from auth.auth import secure
from clients.user_client import UserClient
from dependencies import Container

router = APIRouter()


@router.get("/psychologists")
@secure()
@inject
async def find_clients(
        request: Request,
        filter: Optional[str] = None,
        user_client: UserClient = Depends(Provide(Container.user_client))):
    current_user = request.session['user']
    return await user_client.find_psychologists(current_user['id'], filter)
