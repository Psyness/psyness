from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from dependencies import Container
from routes import google_login_routes, session_routes
from configs.settings import Settings

app = FastAPI()
settings = Settings()
container = Container()

app.add_middleware(SessionMiddleware, secret_key=settings.jwt_secret)
app.container = container
app.include_router(google_login_routes.router)
app.include_router(session_routes.router)
