import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from "@angular/material/dialog";
import { EventDialogComponent } from "./event-dialog/event-dialog.component";
import { endOfHour, startOfHour } from 'date-fns';
import { AppointmentService } from "../../services/appointment.service";
import { Appointment } from "../../models/appointment";
import { Observable } from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public appointments$?: Observable<CalendarEvent[]>;
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService
  ) {
  }

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments()
  }

  public showCreateEventDialog(event: { date: Date, sourceEvent: MouseEvent }) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '450px',
      data: { start: startOfHour(event.date), end: endOfHour(event.date), title: '' },
    });

    dialogRef.afterClosed().subscribe((result: Appointment) => {
      if (result) {
        this.appointments$ = this.appointmentService.saveAppointment(result);
      }
    });
  }

}
