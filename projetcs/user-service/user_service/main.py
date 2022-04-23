from fastapi import FastAPI

from dependencies import Container
from routes import user_routes

container = Container()
container.wire(packages=['routes'])

app = FastAPI()
app.container = container
app.include_router(user_routes.router)
