from enum import Enum
from typing import List
from uuid import UUID

from pydantic import BaseModel


class UserRole(str, Enum):
    PSYCHOLOGIST = 'PSYCHOLOGIST'
    CLIENT = 'CLIENT'


class CreateUser(BaseModel):
    username: str
    provider: str
    first_name: str
    last_name: str


class User(BaseModel):
    id: UUID
    username: str
    provider: str
    first_name: str
    last_name: str
    roles: List[UserRole]


class UserList(BaseModel):
    users: List[User]
