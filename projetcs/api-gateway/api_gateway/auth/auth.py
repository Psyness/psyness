from functools import wraps

import itsdangerous
from fastapi import HTTPException, status

from configs.settings import Settings
from dto.user_dto import UserDto

settings = Settings()
signer = itsdangerous.TimestampSigner(str(settings.jwt_secret))


def secure(**kwargs):
    roles = kwargs.get('roles', [])

    def wrapper(func):
        @wraps(func)
        async def wrapped(*args, **kwargs):
            session = kwargs.get('request', {}).session.get('user')

            if not session:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                    detail="Session is required")

            user: UserDto = UserDto(**session)
            has_required_role = any(role in user.roles for role in roles)

            if len(roles) and not has_required_role:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                    detail=f"This route is available for {roles}")

            return await func(*args, **kwargs)

        return wrapped

    return wrapper
