from sqlalchemy import Table, Column, MetaData, Boolean
from sqlalchemy.dialects.postgresql import UUID

metadata_obj = MetaData()

one_time_link_table = Table('one_time_link',
                     metadata_obj,
                     Column('id', UUID(as_uuid=True), primary_key=True, nullable=False),
                     Column('psychologist_id', UUID(as_uuid=True), nullable=False),
                     Column('is_used', Boolean, nullable=False))
