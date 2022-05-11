export enum AppointmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED'
}

export interface Appointment {
  title: string;
  attendeeId?: string;
  start: Date;
  end: Date;
}

export interface AppointmentInfo {
  initiator: string
}

export interface AppointmentAttendee {
  uuid: string;
  status: AppointmentStatus;
}

export interface AppointmentResponse {
  id: string;
  title: string;
  start_time: number;
  end_time: number;
  initiator: string;
  attendees: AppointmentAttendee[]
}

export interface AppointmentRequest {
  title: string;
  attendee_id: string;
  start_time: number;
  end_time: number;
}

export interface AppointmentListResponse {
  user_id: string
  events: AppointmentResponse[]
}
