from pydantic import BaseModel


class CreateUserDto(BaseModel):
    username: str
    provider: str
    first_name: str
    last_name: str
