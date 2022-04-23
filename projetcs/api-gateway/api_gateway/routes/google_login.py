from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from starlette.requests import Request

from config.settings import settings

router = APIRouter()
oauth = OAuth()

oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_id=settings.google_client_id,
    client_secret=settings.google_client_secret,
    client_kwargs={
        'scope': 'openid email profile',
        'prompt': 'consent'
    },
)


@router.get("/login/google")
async def login(request: Request):
    redirect_uri = request.url_for('login_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google")
async def login_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user = token['userinfo']
    request.session['user'] = dict({
        'email': user.get('email'),
        'provider': 'GOOGLE'
    })
    return RedirectResponse(settings.frontend_url)
