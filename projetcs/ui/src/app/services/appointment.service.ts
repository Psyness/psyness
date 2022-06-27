import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {
  CreateAppointmentRequest,
  AppointmentInfo,
  AppointmentListResponse,
  AppointmentRequest,
  AppointmentResponse,
  AppointmentStatus,
  OneTimeLink, AppointmentList
} from "../models/appointment";
import {CalendarEvent} from "angular-calendar";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private eventColors: { [key in AppointmentStatus]: { initiatorColor: string, color: string } } = {
    PENDING: {color: '#d9d7d7', initiatorColor: 'yellow'},
    APPROVED: {color: 'blue', initiatorColor: 'blue'},
    CANCELLED: {color: 'red', initiatorColor: 'red'},
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  getAppointments(startTime: Date, endTime: Date): Observable<AppointmentList> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/events`, {
      params: {
        start_time: startTime.valueOf(),
        end_time: endTime.valueOf()
      },
      withCredentials: true
    })
      .pipe(
        map(result => ({
            userId: result.user_id,
            events: result.events.map(event => {
              const color = this.calculateColor(event, result.user_id);
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
                  initiator: event.initiator,
                  hidden: event.hidden
                }
              }
            })
          })
        )
      );
  }

  getContractorAppointments(contractorId: string, startTime: Date, endTime: Date): Observable<AppointmentList> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/contractor-events/${contractorId}`, {
      params: {
        start_time: startTime.valueOf(),
        end_time: endTime.valueOf()
      },
      withCredentials: true
    })
      .pipe(
        map(result => ({
            userId: result.user_id,
            events: result.events.map(event => {
              const color = this.calculateColor(event, result.user_id);
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
                  initiator: event.initiator,
                  hidden: event.hidden
                }
              }
            })
          })
        )
      );
  }

  getAppointmentsByLink(oneTimeLinkId: string, startTime: Date, endTime: Date): Observable<AppointmentList> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/events/one-time-link/${oneTimeLinkId}`, {
      params: {
        start_time: startTime.valueOf(),
        end_time: endTime.valueOf()
      },
      withCredentials: true
    })
      .pipe(
        map(result => ({
            userId: result.user_id,
            events: result.events.map(event => {
              const color = this.calculateColor(event, result.user_id);
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
                  initiator: event.initiator,
                  hidden: event.hidden
                }
              }
            })
          })
        )
      );
  }

  private calculateColor(appointment: AppointmentResponse, user_id: string): string {
    const {attendees, initiator} = appointment;

    if (appointment.hidden) {
      return 'black';
    }

    const isCancelled = attendees.filter(a => a.status === AppointmentStatus.CANCELLED).length > 0
    if (isCancelled) {
      return this.eventColors[AppointmentStatus.CANCELLED].color;
    }

    const isApproved = attendees.filter(a => a.status === AppointmentStatus.APPROVED).length === attendees.length
    if (isApproved) {
      return this.eventColors[AppointmentStatus.APPROVED].color;
    }

    const initiatedByCurrentUser = user_id === initiator;
    const colors = this.eventColors[AppointmentStatus.PENDING];
    return initiatedByCurrentUser ? colors.initiatorColor : colors.color;
  }

  saveAppointment(appointment: Required<CreateAppointmentRequest>): Observable<CreateAppointmentRequest> {
    const event: AppointmentRequest = {
      title: appointment.title,
      start_time: appointment.start.getTime(),
      end_time: appointment.end.getTime(),
      attendee_id: appointment.attendeeId,
    }
    return this.httpClient.post<CreateAppointmentRequest>(`${environment.apiGatewayUrl}/events`, event, {
      withCredentials: true
    });
  }

  updateAppointment(eventId: string, status: AppointmentStatus): Observable<CreateAppointmentRequest> {
    return this.httpClient.post<CreateAppointmentRequest>(`${environment.apiGatewayUrl}/events/${eventId}/statuses`, {status}, {
      withCredentials: true
    });
  }

  createOneTimeAppointmentLink(): Observable<string> {
    return this.httpClient.post<OneTimeLink>(`${environment.apiGatewayUrl}/events/one-time-link`, {}, {
      withCredentials: true
    })
      .pipe(
        map(result => (`${window.location.origin}/calendars/one-time-link/${result.id}`))
      )
  }

}
