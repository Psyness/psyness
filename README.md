# Psyness

The platform that helps to psychologists to consult their clients

# Requirements

* Python 3.9+
* Node 14+
* Poetry (dependency management tool)
* Docker

#Setup infrastructure

* Run `cd ${PSYNESS_HOME}`
* Run `docker-compose up -d`

# Run api-gateway

* Run `cd ${PSYNESS_HOME}/projects/api-gateway`
* Run `poetry install`
* Run `cd api_gateway`
* Run `touch .env`
* Add to the `.env` file the next variables
  ```
      GOOGLE_CLIENT_ID=<client_id>
      GOOGLE_CLIENT_SECRET=<client_secret>
      JWT_SECRET=SOME-SECURE-SECRET
      USER_SERVICE_URL=http://localhost:8001
      EVENT_SERVICE_URL=http://localhost:8002
      FRONTEND_URL=http://localhost:4200
      SUCCESS_REDIRECT_URL=http://localhost:4200/home
  ```
* Run `uvicorn main:app --reload`

# Run user-service

* Run `cd ${PSYNESS_HOME}/projects/user-service`
* Run `poetry install`
* Run `cd user_service`
* Run `touch .env`
* Add to the `.env` file the next variables
  ```
      DATABASE_URL=localhost
      DATABASE_PORT=15432
      DATABASE_USER=postgres
      DATABASE_PASSWORD=postgres
      DATABASE_NAME=psyness_users
  ```
* Run `uvicorn main:app --reload --port 8001`

# Run event-service

* Run `cd ${PSYNESS_HOME}/projects/event-service`
* Run `poetry install`
* Run `cd event_service`
* Run `touch .env`
* Add to the `.env` file the next variables
  ```
      DATABASE_URL=localhost
      DATABASE_PORT=15432
      DATABASE_USER=postgres
      DATABASE_PASSWORD=postgres
      DATABASE_NAME=psyness_events
  ```
* Run `uvicorn main:app --reload --port 8001`

# Run migration

* Run `cd ${PSYNESS_HOME}/projects/user-service`
* Run `yoyo apply --database postgresql://postgres:postgres@localhost:15432/psyness_users ./migrations`
* Run `cd ${PSYNESS_HOME}/projects/event-service`
* Run `yoyo apply --database postgresql://postgres:postgres@localhost:15432/psyness_events ./migrations`

# Run the frontend

* Run `cd ${PSYNESS_HOME}/projects/ui`
* Run `nvm use 14`
* Run `npm install`
* Run `ng serve`

# How to create new migration if required

* Run `cd ${PSYNESS_HOME}/projects/use-service`
* Run `yoyo new ./migrations -m "EXPLANATION_OF_THE_MIGRATION"`
* Run `:w` to save you changes
* Run `:q` to exit vim

# How to add new dependency to poetry

* Run `cd <POETRY-DIRECTORY>`
* Run `poetry add <dependency-name>`
