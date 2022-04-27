"""
Create users table
"""

from yoyo import step

__depends__ = {}

steps = [
    step("""
        CREATE TABLE app_user (
            provider TEXT NOT NULL,
            username TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT,
            roles TEXT[],
            PRIMARY KEY (username, provider)
        );
    """)
]
