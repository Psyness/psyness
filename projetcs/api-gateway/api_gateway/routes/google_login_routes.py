from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
from starlette.requests import Request

from clients.google_client import GoogleClient
from clients.user_client import UserClient
from configs.settings import Settings
from dependencies import Container

router = APIRouter()


@router.get("/login/google")
@inject
async def login(request: Request,
                google_client: GoogleClient = Depends(Provide[Container.google_client])):
    redirect_uri = request.url_for('login_callback')
    return await google_client.authorize_redirect(request, redirect_uri)


@router.get("/auth/google")
@inject
async def login_callback(request: Request,
                         google_client: GoogleClient = Depends(Provide[Container.google_client]),
                         user_client: UserClient = Depends(Provide[Container.user_client]),
                         settings: Settings = Depends(Provide[Container.settings])):
    user_details = await google_client.get_user_info(request)
    user = await user_client.upsert_psychologist(user_details)
    request.session['user'] = user.dict()
    return RedirectResponse(settings.success_redirect_url)
