export interface WorkingTime {
  startTime: string,
  endTime: string
}


export interface Week {
  monday: Array<WorkingTime>
  tuesday: Array<WorkingTime>
  wednesday: Array<WorkingTime>
  thursday: Array<WorkingTime>
  friday: Array<WorkingTime>
  saturday: Array<WorkingTime>
  sunday: Array<WorkingTime>
}

export interface UserSchedule {
  startTime: number
  type: string
  weeks: Array<Week>
}

export interface WorkingTimeResponse {
  start_time: string,
  end_time: string
}

export interface WeekResponse {
  monday: Array<WorkingTimeResponse>
  tuesday: Array<WorkingTimeResponse>
  wednesday: Array<WorkingTimeResponse>
  thursday: Array<WorkingTimeResponse>
  friday: Array<WorkingTimeResponse>
  saturday: Array<WorkingTimeResponse>
  sunday: Array<WorkingTimeResponse>
}

export interface UserScheduleResponse {
  start_time: number
  type: string
  weeks: Array<WeekResponse>
}
