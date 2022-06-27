"""
CREATE_ONE_TIME_EVENT_TOKEN
"""

from yoyo import step

__depends__ = {'20220509_01_Mlpbr-create-events-table'}

steps = [
    step("""
        CREATE TABLE one_time_link (
            id UUID NOT NULL,
            psychologist_id UUID NOT NULL,
            is_used  BOOLEAN  NOT NULL DEFAULT FALSE
        );
    """)
]
