from fastapi import APIRouter
from starlette.requests import Request

router = APIRouter()


@router.get("/sessions/me")
async def login(request: Request):
    jwt = request.cookies['session']
    return jwt
