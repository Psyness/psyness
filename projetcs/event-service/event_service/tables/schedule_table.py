from sqlalchemy import Table, Column, String, MetaData, BigInteger
from sqlalchemy.dialects.postgresql import UUID, JSONB

metadata_obj = MetaData()

user_schedule_table = Table('user_schedule',
                            metadata_obj,
                            Column('psychologist_id', UUID(as_uuid=True), primary_key=True, nullable=False),
                            Column('start_time', BigInteger, nullable=False),
                            Column('type', String, nullable=False),
                            Column('schedule', JSONB, nullable=False))
