from pydantic import BaseSettings


class Settings(BaseSettings):
    google_client_id: str
    google_client_secret: str
    jwt_secret: str
    frontend_url: str
    user_service_url: str
    event_service_url: str
    success_redirect_url: str

    class Config:
        env_file = ".env"
