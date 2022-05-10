import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from "@angular/material/dialog";
import { EventDialogComponent } from "./event-dialog/event-dialog.component";
import { endOfHour, startOfHour } from 'date-fns';
import { AppointmentService } from "../../services/appointment.service";
import { Appointment, AppointmentInfo, AppointmentStatus } from "../../models/appointment";
import { Observable } from "rxjs";
import { SessionService } from "../../services/session.service";
import { User } from "../../models/user";
import { UpdateAppointmentDialogComponent } from "./approve-event-dialog/update-appointment-dialog.component";

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
  }

  public showCreateEventDialog(event: { date: Date, sourceEvent: MouseEvent }) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '450px',
      data: { start: startOfHour(event.date), end: endOfHour(event.date), title: '' },
    });

    dialogRef.afterClosed().subscribe((result: Required<Appointment>) => {
      if (result) {
        this.appointments$ = this.appointmentService.saveAppointment(result);
      }
    });
  }

  public showEditEventDialog(event: { event: CalendarEvent<AppointmentInfo> }) {
    if (event.event.meta?.initiator === this.user?.id) {
      this.showCancelDialog()
      return
    }

    this.showApproveDialog(event.event)
  }

  private showApproveDialog(event: CalendarEvent<AppointmentInfo>) {
    const dialogRef = this.dialog.open(UpdateAppointmentDialogComponent, {
      width: '450px',
      data: event.id,
    });

    dialogRef.afterClosed().subscribe((result: { appointmentId: string, status: AppointmentStatus }) => {
      if (result) {
        this.appointments$ = this.appointmentService.updateAppointment(result.appointmentId, result.status);
      }
    });
  }

  private showCancelDialog() {

  }

}
