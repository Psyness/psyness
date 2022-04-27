from typing import List

from pydantic import BaseModel

from models.user_model import UserRole


class CreateUserDto(BaseModel):
    username: str
    provider: str
    first_name: str
    last_name: str


class UserDto(BaseModel):
    username: str
    provider: str
    first_name: str
    last_name: str
    roles: List[UserRole]
