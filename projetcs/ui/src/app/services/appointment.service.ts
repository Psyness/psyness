import { Injectable } from '@angular/core';
import { map, mergeMap, Observable } from "rxjs";
import {
  Appointment,
  AppointmentInfo,
  AppointmentListResponse,
  AppointmentRequest,
  AppointmentStatus
} from "../models/appointment";
import { CalendarEvent } from "angular-calendar";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private eventColors: { [key in AppointmentStatus]: { initiatorColor: string, color: string } } = {
    PENDING: { color: '#d9d7d7', initiatorColor: 'yellow' },
    APPROVED: { color: 'blue', initiatorColor: 'blue' },
    CANCELLED: { color: 'red', initiatorColor: 'red' },
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  getAppointments(): Observable<CalendarEvent<AppointmentInfo>[]> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/events`, {
      withCredentials: true
    })
      .pipe(
        map(result => result.events.map(event => {
            const initiatedByCurrentUser = result.user_id === event.initiator;
            const colorSet = this.eventColors[event.status];
            const color = initiatedByCurrentUser ? colorSet.initiatorColor : colorSet.color
            return {
              id: event.id,
              title: event.title,
              start: new Date(event.start_time),
              end: new Date(event.end_time),
              color: {
                primary: color,
                secondary: color
              },
              meta: {
                initiator: event.initiator
              }
            }
          })
        )
      );
  }

  saveAppointment(appointment: Required<Appointment>): Observable<CalendarEvent<AppointmentInfo>[]> {
    const event: AppointmentRequest = {
      title: appointment.title,
      start_time: appointment.start.getTime(),
      end_time: appointment.end.getTime(),
      client_id: appointment.clientId,
    }
    return this.httpClient.post<void>(`${environment.apiGatewayUrl}/events`, event, {
      withCredentials: true
    })
      .pipe(
        mergeMap(() => this.getAppointments())
      );
  }

  updateAppointment(eventId: string, status: AppointmentStatus): Observable<CalendarEvent<AppointmentInfo>[]> {
    return this.httpClient.post<void>(`${environment.apiGatewayUrl}/events/${eventId}/statuses`, { status }, {
      withCredentials: true
    })
      .pipe(
        mergeMap(() => this.getAppointments())
      );
  }

}
