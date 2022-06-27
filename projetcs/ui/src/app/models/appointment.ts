import { User } from "./user";
import { CalendarEvent } from "angular-calendar";

export enum AppointmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED'
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
  hidden?: boolean;
  attendees: AppointmentAttendee[]
}

export interface AppointmentListResponse {
  user_id: string
  events: AppointmentResponse[]
}

export interface AppointmentList {
  userId: string,
  events: Array<CalendarEvent<AppointmentInfo>>
}

export interface AppointmentRequest {
  title: string;
  attendee_id: string;
  start_time: number;
  end_time: number;
}

export interface CreateAppointmentRequest {
  title: string;
  attendeeId?: string;
  start: Date;
  end: Date;
}

export interface AppointmentInfo {
  initiator: string;
  hidden?: boolean;
}

export interface CalendarConfig {
  attendeeId?: string;
  oneTimeLinkId?: string
  alwaysShowUserCalendar: boolean
  users: User[]
}

export interface OneTimeLink {
  id: string
}
