"""
create schedules table
"""

from yoyo import step

__depends__ = {'20220626_01_ItKWE-create-one-time-event-token'}

steps = [
    step("""
     CREATE TABLE user_schedule (
         psychologist_id UUID PRIMARY KEY NOT NULL,
         start_time BIGINT NOT NULL,
         type TEXT NOT NULL,
         schedule JSONB NOT NULL
     );
    """)
]
