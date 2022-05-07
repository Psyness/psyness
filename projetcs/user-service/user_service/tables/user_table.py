from sqlalchemy import Table, Column, String, MetaData, ARRAY, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID

metadata_obj = MetaData()

users_table = Table('app_user',
                    metadata_obj,
                    Column('id', UUID(as_uuid=True), primary_key=True),
                    Column('username', String),
                    Column('provider', String),
                    Column('first_name', String),
                    Column('last_name', String),
                    Column('roles', ARRAY(String)),
                    UniqueConstraint('username', 'provider', name='username_provider_u_idx'))
