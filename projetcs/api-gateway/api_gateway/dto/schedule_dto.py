from typing import List

from pydantic import BaseModel


class WorkingTime(BaseModel):
    start_time: str
    end_time: str


class WeeklySchedule(BaseModel):
    monday: List[WorkingTime]
    tuesday: List[WorkingTime]
    wednesday: List[WorkingTime]
    thursday: List[WorkingTime]
    friday: List[WorkingTime]
    saturday: List[WorkingTime]
    sunday: List[WorkingTime]


class UserSchedule(BaseModel):
    start_time: int
    type: str
    weeks: List[WeeklySchedule]
