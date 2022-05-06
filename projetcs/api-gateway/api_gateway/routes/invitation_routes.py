from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette.requests import Request

from auth.auth import secure
from clients.user_client import UserClient
from dependencies import Container

router = APIRouter()


@router.post("/invitations")
@secure()
@inject
async def create_invitation(request: Request, user_client: UserClient = Depends(Provide(Container.user_client))):
    return {}
