from sqlalchemy import Table, Column, String, MetaData
from sqlalchemy.dialects.postgresql import UUID

metadata_obj = MetaData()

invitations_table = Table('app_user_invitation',
                          metadata_obj,
                          Column('id', UUID(as_uuid=True), primary_key=True),
                          Column('inviter', UUID(as_uuid=True)),
                          Column('status', String))
