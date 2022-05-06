"""
Create users table
"""

from yoyo import step

__depends__ = {}

steps = [
    step("""
        CREATE TABLE app_user (
            id UUID NOT NULL,
            provider TEXT NOT NULL,
            username TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT,
            roles TEXT[],
            PRIMARY KEY (id)
        );
        
        CREATE UNIQUE INDEX username_provider_u_idx ON app_user (username, provider);
    """)
]
