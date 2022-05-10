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

  private eventColors: { [key in AppointmentStatus]: string } = {
    PENDING: '#d9d7d7'
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  getAppointments(): Observable<CalendarEvent<AppointmentInfo>[]> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/events`, {
      withCredentials: true
    })
      .pipe(
        map(result => result.events.map(event => ({
            title: event.title,
            start: new Date(event.start_time),
            end: new Date(event.end_time),
            color: {
              primary: this.eventColors[event.status],
              secondary: this.eventColors[event.status]
            },
            meta: {
              initiator: event.initiator
            }
          }))
        )
      );
  }

  saveAppointment(appointment: Appointment): Observable<CalendarEvent<AppointmentInfo>[]> {
    const event: AppointmentRequest = {
      title: appointment.title,
      start_time: appointment.start.getTime(),
      end_time: appointment.end.getTime(),
      //TODO make not required
      client_id: appointment.clientId || '',
    }
    return this.httpClient.post<void>(`${environment.apiGatewayUrl}/events`, event, {
      withCredentials: true
    })
      .pipe(
        mergeMap(() => this.getAppointments())
      );
  }

}
