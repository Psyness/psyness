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
      FRONTEND_URL=/sessions/me
  ```
* Run `uvicorn main:app --reload`

# Run user-service

* Run `cd ${PSYNESS_HOME}/projects/use-service`
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

# Run migration

* Run `cd ${PSYNESS_HOME}/projects/use-service`
* Run `yoyo apply --database postgresql://postgres:postgres@localhost:15432/psyness_users ./migrations`

# Create new migration

* Run `cd ${PSYNESS_HOME}/projects/use-service`
* Run `yoyo new ./migrations -m "EXPLANATION_OF_THE_MIGRATION"`
* Run `:w` to save you changes
* Run `:q` to exit vim

# Run the frontend

* Run `cd ${PSYNESS_HOME}/projects/ui`
* Run `nvm use 14`
* Run `npm install`
* Run `ng serve`