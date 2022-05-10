from pydantic import BaseSettings


class Settings(BaseSettings):
    database_url: str
    database_port: int
    database_user: str
    database_password: str
    database_name: str

    class Config:
        env_file = ".env"
