from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from routes import google_login_routes, session_routes
from configs.settings import settings

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=settings.jwt_secret)
app.include_router(google_login_routes.router)
app.include_router(session_routes.router)
