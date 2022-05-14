import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { CreateEventDialogComponent } from "../create-event-dialog/create-event-dialog.component";
import { endOfHour, startOfHour } from 'date-fns';
import { AppointmentService } from "../../services/appointment.service";
import { Appointment, AppointmentInfo, AppointmentStatus, CalendarData } from "../../models/appointment";
import { Observable } from "rxjs";
import { SessionService } from "../../services/session.service";
import { User } from "../../models/user";
import { ConfirmEventDialogComponent } from "../confirm-event-dialog/confirm-event-dialog.component";
import { ViewEventDialogComponent } from "../view-event-dialog/view-event-dialog.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public appointments$?: Observable<CalendarEvent<AppointmentInfo>[]>;
  public user?: User;
  public viewDate = new Date()
  public locale: string = 'ru';

  @Output() public reloadEvents = new EventEmitter<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService,
    private readonly sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public readonly calendarData: CalendarData
  ) {
  }

  ngOnInit(): void {
    this.sessionService.getSession()
      .subscribe(user => this.user = user)
  }

  public showCreateEventDialog(event: { date: Date, sourceEvent: MouseEvent }) {
    if (!this.calendarData.attendeeId) {
      return;
    }

    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '450px',
      data: { start: startOfHour(event.date), end: endOfHour(event.date), title: '' },
    });

    dialogRef.afterClosed().subscribe((result: Required<Appointment>) => {
      if (result) {
        this.appointmentService.saveAppointment(result).subscribe(
          () => this.reloadEvents.emit()
        );
      }
    });
  }

  public showEditEventDialog(event: { event: CalendarEvent<AppointmentInfo> }) {
    if (event.event.meta?.initiator === this.user?.id) {
      this.showViewDialog(event.event)
      return
    }

    this.showApproveDialog(event.event)
  }

  private showApproveDialog(event: CalendarEvent<AppointmentInfo>) {
    const dialogRef = this.dialog.open(ConfirmEventDialogComponent, {
      width: '450px',
      data: event.id,
    });

    dialogRef.afterClosed().subscribe((result: { appointmentId: string, status: AppointmentStatus }) => {
      if (result) {
        this.appointmentService.updateAppointment(result.appointmentId, result.status).subscribe(
          () => this.reloadEvents.emit()
        );
      }
    });
  }

  private showViewDialog(event: CalendarEvent<AppointmentInfo>) {
    const dialogRef = this.dialog.open(ViewEventDialogComponent, {
      width: '450px',
      data: event.id,
    });

    dialogRef.afterClosed().subscribe((result: { appointmentId: string, status: AppointmentStatus }) => {
      if (result) {
        this.appointmentService.updateAppointment(result.appointmentId, result.status).subscribe(
          () => this.reloadEvents.emit()
        );
      }
    });
  }

}
