from fastapi import FastAPI

from dependencies import Container
from routes import event_routes, one_time_link_routes, schedule_routes

container = Container()
container.wire(packages=['routes'])

app = FastAPI()
app.container = container
app.include_router(event_routes.router)
app.include_router(one_time_link_routes.router)
app.include_router(schedule_routes.router)
