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
            start_time BIGINT NOT NULL,
            end_time BIGINT NOT NULL,
            initiator UUID NOT NULL,
            attendees  JSONB  NOT NULL
        );
    """)
]
