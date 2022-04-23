from fastapi import APIRouter
from starlette.requests import Request

from clients import users

router = APIRouter()


@router.get("/sessions/me")
async def login(request: Request):
    jwt = request.cookies['session']
    return users.get_user(jwt, jwt)
