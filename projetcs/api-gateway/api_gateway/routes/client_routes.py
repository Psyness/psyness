from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from auth.auth import secure
from clients.user_client import UserClient
from dependencies import Container

router = APIRouter()


@router.get("/clients")
@secure()
@inject
async def find_clients(request: Request, user_client: UserClient = Depends(Provide(Container.user_client))):
    return {'users': [{'username': 'username',  'first_name': 'first', 'last_name': 'last'}]}
