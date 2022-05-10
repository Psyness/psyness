"""
Create events table
"""

from yoyo import step

__depends__ = {}

steps = [
    step("""
        CREATE TABLE events (
            id UUID NOT NULL,
            title TEXT NOT NULL,
            status TEXT NOT NULL,
            start_time BIGINT NOT NULL,
            end_time BIGINT NOT NULL,
            psychologist_id UUID NOT NULL,
            client_id UUID NOT NULL,
            initiator UUID NOT NULL
        );
    """)
]
