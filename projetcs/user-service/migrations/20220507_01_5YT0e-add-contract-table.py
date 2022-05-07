"""
Add contract table
"""

from yoyo import step

__depends__ = {'20220506_01_B53HI-add-invitatios-table'}

steps = [
    step("""
         CREATE TABLE app_user_contract (
            id UUID NOT NULL,
            psychologist_id UUID NOT NULL,
            client_id UUID NOT NULL
        );
        
        CREATE UNIQUE INDEX psychologist_client_u_idx ON app_user_contract (psychologist_id, client_id);
    """)
]
