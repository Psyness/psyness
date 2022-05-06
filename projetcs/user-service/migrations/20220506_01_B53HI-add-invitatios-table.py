"""
Add invitatios table
"""

from yoyo import step

__depends__ = {'20220423_01_gLvfY-create-users-table'}

steps = [
    step("""
        CREATE TABLE app_user_invitation (
            id UUID NOT NULL,
            inviter UUID NOT NULL,
            status TEXT NOT NULL,
            PRIMARY KEY (id)
        );
    """)
]
