"""
Create users table
"""

from yoyo import step

__depends__ = {}

steps = [
    step("""
        CREATE TABLE app_user (
            provider text,
            username text,
            
            PRIMARY KEY (username, provider)
        );
    """)
]
