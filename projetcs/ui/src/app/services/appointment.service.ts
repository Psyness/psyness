import { Injectable } from '@angular/core';
import { debounce, interval, Observable, of } from "rxjs";
import { Appointment } from "../models/appointment";
import { CalendarEvent } from "angular-calendar";
import { endOfHour, startOfHour } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointments: CalendarEvent[] = [
    {
      start: startOfHour(new Date()),
      end: endOfHour(new Date()),
      title: 'title'
    }
  ];

  constructor() {
  }

  getAppointments(): Observable<CalendarEvent[]> {
    return of(this.appointments)
      .pipe(
        debounce(() => interval(500))
      );
  }

  saveAppointment(appointment: Appointment): Observable<CalendarEvent[]> {
    const calendarEvent = {
      start: appointment.start,
      end: appointment.end,
      title: appointment.title
    }
    this.appointments = [...this.appointments, calendarEvent];

    return this.getAppointments()
  }

}
