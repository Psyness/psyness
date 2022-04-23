from sqlalchemy.orm import Session

from models.user_model import User


class UserRepository:

    def __init__(self, session: Session):
        self._session = session

    async def save(self, user: User):
        self._session.add(user)
        self._session.commit()
        self._session.refresh(user)
        return user

    async def get(self, provider, username):
        return self._session.query(User) \
            .filter(User.username == username, User.provider == provider) \
            .first()
