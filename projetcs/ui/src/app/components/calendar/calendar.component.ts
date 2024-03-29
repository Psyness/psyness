import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from "@angular/material/dialog";
import { CreateEventDialogComponent } from "../create-event-dialog/create-event-dialog.component";
import { addDays, endOfHour, endOfWeek, startOfHour, startOfWeek } from 'date-fns';
import { AppointmentService } from "../../services/appointment.service";
import { AppointmentInfo, AppointmentStatus, CalendarConfig, CreateAppointmentRequest } from "../../models/appointment";
import { ConfirmEventDialogComponent } from "../confirm-event-dialog/confirm-event-dialog.component";
import { ViewEventDialogComponent } from "../view-event-dialog/view-event-dialog.component";
import { MatSelectionListChange } from "@angular/material/list";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnChanges {

  public locale: string = 'ru';
  public loading: boolean = false;
  public viewDate = new Date()

  public userId?: string;
  public appointments: CalendarEvent<AppointmentInfo>[] = [];

  @Input() public calendarData: CalendarConfig = { users: [], alwaysShowUserCalendar: false };
  @Output() public setSelectedUserId = new EventEmitter<string>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue } = changes['calendarData'];

    if (!previousValue) {
      this.reloadEvents();
    }
    console.log(previousValue && currentValue.attendeeId !== previousValue.attendeeId)
    if (previousValue && currentValue.attendeeId !== previousValue.attendeeId) {
      this.reloadEvents();
    }
  }

  public onUserSelect(event: MatSelectionListChange) {
    this.setSelectedUserId.emit(event.options[0]?.value)
  }

  public setTodayView() {
    this.viewDate = new Date();
    this.reloadEvents();
  }

  public addDaysToView(numberOfDays: number) {
    this.viewDate = addDays(this.viewDate, numberOfDays);
    this.reloadEvents();
  }

  public showCreateEventDialog(event: { date: Date, sourceEvent: MouseEvent }) {
    if (!this.calendarData.attendeeId) {
      return;
    }

    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '450px',
      data: {
        start: startOfHour(event.date),
        end: endOfHour(event.date),
        title: 'Консультация',
        attendeeId: this.calendarData.attendeeId
      },
    });

    dialogRef.afterClosed().subscribe((result: Required<CreateAppointmentRequest>) => {
      if (!result) {
        return;
      }

      if (this.calendarData.oneTimeLinkId) {
        this.appointmentService.saveAppointmentByLink(result, this.calendarData.oneTimeLinkId)
          .subscribe(() => this.reloadEvents());
        return;
      }

      this.appointmentService.saveAppointment(result)
        .subscribe(() => this.reloadEvents());
    });
  }

  public showEditEventDialog(event: { event: CalendarEvent<AppointmentInfo> }) {
    if (event.event.meta?.initiator === this.userId) {
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
          () => this.reloadEvents()
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
          () => this.reloadEvents()
        );
      }
    });
  }

  public reloadEvents() {
    this.loading = true;
    const startTime = startOfWeek(this.viewDate, { weekStartsOn: 1 });
    const endTime = endOfWeek(this.viewDate, { weekStartsOn: 1 });

    if (this.calendarData.oneTimeLinkId) {
      this.appointmentService.getAppointmentsByLink(this.calendarData.oneTimeLinkId, startTime, endTime)
        .subscribe(appointments => {
          this.loading = false;
          this.appointments = appointments.events;
          this.setSelectedUserId.emit(appointments.userId);
        });
      return;
    }

    if (!this.calendarData.alwaysShowUserCalendar && this.calendarData.attendeeId) {
      this.appointmentService.getContractorAppointments(this.calendarData.attendeeId, startTime, endTime)
        .subscribe(appointments => {
          this.loading = false;
          this.appointments = appointments.events;
          this.userId = appointments.userId
        });
      return;
    }

    this.appointmentService.getAppointments(startTime, endTime)
      .subscribe(appointments => {
        this.loading = false;
        this.appointments = appointments.events;
        this.userId = appointments.userId
      });
  }

}
