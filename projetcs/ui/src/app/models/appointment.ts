export interface Appointment {
  title: string;
  clientId?: string;
  start: Date;
  end: Date;
}

export interface AppointmentResponse {
  title: string;
  client_id: string;
  start_time: number;
  end_time: number;
}

export type AppointmentRequest = Pick<AppointmentResponse, 'title' | 'start_time' | 'end_time' | 'client_id'>

export interface AppointmentListResponse {
  events: AppointmentResponse[]
}
