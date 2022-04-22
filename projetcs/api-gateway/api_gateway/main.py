from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from routes import login, session
from config.settings import settings

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=settings.jwt_secret)
app.include_router(login.router)
app.include_router(session.router)
