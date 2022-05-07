from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine

from models.invitation_model import Invitation
from tables.invitation_table import invitations_table


class InvitationRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def save(self, invitation: Invitation) -> Invitation:
        with self._engine.connect() as conn:
            query = insert(invitations_table) \
                .values(id=invitation.id,
                        inviter=invitation.inviter,
                        status=invitation.status) \
                .returning(invitations_table)

            saved_invitation = conn.execute(query)
            return saved_invitation.first()
