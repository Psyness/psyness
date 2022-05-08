import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
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
    return of(this.appointments);
  }

  saveAppointment(appointment: Appointment): Observable<CalendarEvent[]> {
    this.appointments.push({
      start: appointment.start,
      end: appointment.end,
      title: appointment.title
    });

    return this.getAppointments()
  }

}
