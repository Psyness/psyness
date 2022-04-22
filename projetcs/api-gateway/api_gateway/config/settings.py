from pydantic import BaseSettings


class Settings(BaseSettings):
    google_client_id: str
    google_client_secret: str
    jwt_secret: str

    class Config:
        env_file = ".env"


settings = Settings()
