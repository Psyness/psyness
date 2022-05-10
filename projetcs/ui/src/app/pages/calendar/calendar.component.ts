import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from "@angular/material/dialog";
import { EventDialogComponent } from "./event-dialog/event-dialog.component";
import { endOfHour, startOfHour } from 'date-fns';
import { AppointmentService } from "../../services/appointment.service";
import { Appointment, AppointmentInfo } from "../../models/appointment";
import { Observable } from "rxjs";
import { SessionService } from "../../services/session.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public appointments$?: Observable<CalendarEvent<AppointmentInfo>[]>;
  public user?: User;
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService,
    private readonly sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments()
    this.sessionService.getSession()
      .subscribe(user => this.user = user)
    console.log(this.appointments$);
  }

  public showCreateEventDialog(event: { date: Date, sourceEvent: MouseEvent }) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '450px',
      data: { start: startOfHour(event.date), end: endOfHour(event.date), title: '' },
    });

    dialogRef.afterClosed().subscribe((result: Appointment) => {
      if (result) {
        this.appointments$ = this.appointmentService.saveAppointment(result);
        console.log(this.appointments$);
      }
    });
  }

  public showEditEventDialog(event: { event: CalendarEvent<AppointmentInfo> }) {
    console.log('initiated by me', event.event.meta?.initiator === this.user?.id)
  }

}
