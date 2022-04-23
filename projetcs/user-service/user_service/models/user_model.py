from sqlalchemy import Table, Column, String, MetaData

metadata_obj = MetaData()

users_table = Table('app_user',
              metadata_obj,
              Column('username', String, primary_key=True),
              Column('provider', String, primary_key=True))
