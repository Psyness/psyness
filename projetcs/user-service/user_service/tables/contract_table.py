from sqlalchemy import Table, Column, MetaData
from sqlalchemy.dialects.postgresql import UUID

metadata_obj = MetaData()

app_user_contract_table = Table('app_user_contract',
                                metadata_obj,
                                Column('id', UUID(as_uuid=True), primary_key=True),
                                Column('psychologist_id', UUID(as_uuid=True)),
                                Column('client_id', UUID(as_uuid=True)))
