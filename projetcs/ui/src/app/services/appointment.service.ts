import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import {
  AppointmentList,
  AppointmentListResponse,
  AppointmentRequest,
  AppointmentResponse,
  AppointmentStatus,
  CreateAppointmentRequest,
  OneTimeLink
} from "../models/appointment";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UserSchedule, UserScheduleResponse } from "../models/schedule";

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

  getAppointments(startTime: Date, endTime: Date): Observable<AppointmentList> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/events`, {
      params: {
        start_time: startTime.valueOf(),
        end_time: endTime.valueOf()
      },
      withCredentials: true
    })
      .pipe(map(result => this.convertEvent(result)));
  }

  getContractorAppointments(contractorId: string, startTime: Date, endTime: Date): Observable<AppointmentList> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/contractor-events/${contractorId}`, {
      params: {
        start_time: startTime.valueOf(),
        end_time: endTime.valueOf()
      },
      withCredentials: true
    })
      .pipe(map(result => this.convertEvent(result)));
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
    return this.httpClient.post<CreateAppointmentRequest>(`${environment.apiGatewayUrl}/events/${eventId}/statuses`, { status }, {
      withCredentials: true
    });
  }

  createOneTimeAppointmentLink(): Observable<string> {
    return this.httpClient.post<OneTimeLink>(`${environment.apiGatewayUrl}/one-time-link`, {}, {
      withCredentials: true
    })
      .pipe(
        map(result => (`${window.location.origin}/calendars/one-time-link/${result.id}`))
      )
  }

  getAppointmentsByLink(oneTimeLinkId: string, startTime: Date, endTime: Date): Observable<AppointmentList> {
    return this.httpClient.get<AppointmentListResponse>(`${environment.apiGatewayUrl}/one-time-link/${oneTimeLinkId}/events`, {
      params: {
        start_time: startTime.valueOf(),
        end_time: endTime.valueOf()
      },
      withCredentials: true
    })
      .pipe(map(result => this.convertEvent(result)));
  }

  saveAppointmentByLink(
    appointment: Required<CreateAppointmentRequest>,
    oneTimeLinkId: string
  ): Observable<CreateAppointmentRequest> {
    const event: AppointmentRequest = {
      title: appointment.title,
      start_time: appointment.start.getTime(),
      end_time: appointment.end.getTime(),
      attendee_id: appointment.attendeeId,
    }
    return this.httpClient.post<CreateAppointmentRequest>(
      `${environment.apiGatewayUrl}/one-time-link/${oneTimeLinkId}/events`,
      event,
      { withCredentials: true }
    );
  }

  getSchedule(): Observable<UserSchedule> {
    return this.httpClient.get<UserScheduleResponse>(
      `${environment.apiGatewayUrl}/schedules`,
      { withCredentials: true }
    )
      .pipe(
        map(response => ({
          startTime: response.start_time,
          type: response.type,
          weeks: response.weeks.map(week => ({
            monday: week.monday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            tuesday: week.tuesday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            wednesday: week.wednesday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            thursday: week.thursday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            friday: week.friday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            saturday: week.saturday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            sunday: week.sunday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time }))
          }))
        }))
      )
  }

  saveSchedule(
    schedule: UserSchedule
  ): Observable<UserSchedule> {
    const scheduleRequest = {
      start_time: schedule.startTime,
      type: schedule.type,
      weeks: schedule.weeks.map(week => ({
        monday: week.monday.map(daily => ({ start_time: daily.startTime, end_time: daily.endTime })),
        tuesday: week.tuesday.map(daily => ({ start_time: daily.startTime, end_time: daily.endTime })),
        wednesday: week.wednesday.map(daily => ({ start_time: daily.startTime, end_time: daily.endTime })),
        thursday: week.thursday.map(daily => ({ start_time: daily.startTime, end_time: daily.endTime })),
        friday: week.friday.map(daily => ({ start_time: daily.startTime, end_time: daily.endTime })),
        saturday: week.saturday.map(daily => ({ start_time: daily.startTime, end_time: daily.endTime })),
        sunday: week.sunday.map(daily => ({ start_time: daily.startTime, end_time: daily.endTime }))
      }))
    }
    return this.httpClient.post<UserScheduleResponse>(
      `${environment.apiGatewayUrl}/schedules`,
      scheduleRequest,
      { withCredentials: true }
    )
      .pipe(
        map(response => ({
          startTime: response.start_time,
          type: response.type,
          weeks: response.weeks.map(week => ({
            monday: week.monday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            tuesday: week.tuesday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            wednesday: week.wednesday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            thursday: week.thursday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            friday: week.friday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            saturday: week.saturday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time })),
            sunday: week.sunday.map(daily => ({ startTime: daily.start_time, endTime: daily.end_time }))
          }))
        }))
      )
  }

  private convertEvent(result: AppointmentListResponse): AppointmentList {
    return {
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
    }
  }

  private calculateColor(appointment: AppointmentResponse, user_id: string): string {
    const { attendees, initiator } = appointment;

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

}
