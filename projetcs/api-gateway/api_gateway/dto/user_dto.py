from pydantic import BaseModel


class UserDto(BaseModel):
    username: str
