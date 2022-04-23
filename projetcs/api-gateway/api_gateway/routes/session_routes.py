from fastapi import APIRouter
from starlette.requests import Request

from clients import user_client

router = APIRouter()


@router.get("/sessions/me")
async def login(request: Request):
    current_user = request.session['user']
    user = await user_client.get(current_user['provider'], current_user['username'])
    return user
