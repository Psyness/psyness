from sqlalchemy import Table, Column, String, MetaData, ARRAY

metadata_obj = MetaData()

users_table = Table('app_user',
                    metadata_obj,
                    Column('username', String, primary_key=True),
                    Column('provider', String, primary_key=True),
                    Column('first_name', String),
                    Column('last_name', String),
                    Column('roles', ARRAY(String)))
