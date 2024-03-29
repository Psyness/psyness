from authlib.integrations.starlette_client import OAuth

from configs.settings import Settings
from dto.user_dto import UserDto, CreateUserDto


class GoogleClient:

    def __init__(self, settings: Settings):
        oauth = OAuth()
        self._google = oauth.register(
            name='google',
            server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
            client_id=settings.google_client_id,
            client_secret=settings.google_client_secret,
            client_kwargs={
                'scope': 'openid email profile',
                'prompt': 'consent'
            },
        )

    async def authorize_redirect(self, request, redirect_uri, **kwargs):
        return await self._google.authorize_redirect(request, redirect_uri, **kwargs)

    async def get_user_info(self, request) -> CreateUserDto:
        token = await self._google.authorize_access_token(request)
        return CreateUserDto(provider='GOOGLE',
                             username=token['userinfo']['email'],
                             first_name=token['userinfo']['given_name'],
                             last_name=token['userinfo']['family_name'])
