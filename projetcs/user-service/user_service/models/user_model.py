from sqlalchemy import Column, String

from configs.database import Base


class User(Base):
    __tablename__ = "app_user"

    username = Column(String, primary_key=True)
    provider = Column(String, primary_key=True)
