from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from configs.settings import Settings
from dependencies import Container
from routes import google_login_routes, session_routes, client_routes

container = Container()
container.wire(packages=['routes'])

app = FastAPI()
app.container = container
app.include_router(google_login_routes.router)
app.include_router(session_routes.router)
app.include_router(client_routes.router)

settings = Settings()
app.add_middleware(SessionMiddleware, secret_key=settings.jwt_secret)
app.add_middleware(CORSMiddleware,
                   allow_origins=[settings.frontend_url],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"], )
