from sqlalchemy import Table, Column, String, MetaData, BigInteger
from sqlalchemy.dialects.postgresql import UUID, JSONB

metadata_obj = MetaData()

events_table = Table('events',
                     metadata_obj,
                     Column('id', UUID(as_uuid=True), primary_key=True, nullable=False),
                     Column('start_time', BigInteger, nullable=False),
                     Column('end_time', BigInteger, nullable=False),
                     Column('title', String, nullable=False),
                     Column('initiator', String, nullable=False),
                     Column('attendees', JSONB, nullable=False))
