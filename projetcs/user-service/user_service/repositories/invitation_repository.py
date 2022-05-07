from uuid import UUID

from sqlalchemy import update
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import Engine
from sqlalchemy.sql import select

from models.invitation_model import Invitation, InvitationStatus
from tables.invitation_table import invitations_table


class InvitationRepository:

    def __init__(self, engine: Engine):
        self._engine = engine

    async def get(self, invitation_id):
        with self._engine.connect() as conn:
            query = select(invitations_table) \
                .where(invitations_table.c.id == invitation_id)
            invitation = conn.execute(query)
            return invitation.first()

    async def save(self, invitation: Invitation) -> Invitation:
        with self._engine.connect() as conn:
            query = insert(invitations_table) \
                .values(id=invitation.id,
                        inviter=invitation.inviter,
                        status=invitation.status) \
                .returning(invitations_table)

            saved_invitation = conn.execute(query)
            return saved_invitation.first()

    async def update_status(self, id: UUID, status: InvitationStatus):
        with self._engine.connect() as conn:
            query = update(invitations_table) \
                .values(status=status) \
                .where(invitations_table.c.id == id) \
                .returning(invitations_table)
            invitation = conn.execute(query)
            return invitation.first()
