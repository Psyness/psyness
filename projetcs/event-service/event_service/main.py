from fastapi import FastAPI

from dependencies import Container
from routes import event_routes

container = Container()
container.wire(packages=['routes'])

app = FastAPI()
app.container = container
app.include_router(event_routes.router)
