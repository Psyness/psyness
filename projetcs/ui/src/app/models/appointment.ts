export enum AppointmentStatus {
  PENDING = 'PENDING'
}

export interface Appointment {
  title: string;
  clientId?: string;
  start: Date;
  end: Date;
}

export interface AppointmentInfo {
  initiator: string
}

export interface AppointmentResponse {
  title: string;
  client_id: string;
  status: AppointmentStatus;
  start_time: number;
  end_time: number;
  initiator: string;
}

export type AppointmentRequest = Pick<AppointmentResponse, 'title' | 'start_time' | 'end_time' | 'client_id'>

export interface AppointmentListResponse {
  events: AppointmentResponse[]
}
