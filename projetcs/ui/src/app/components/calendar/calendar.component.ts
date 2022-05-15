import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from "@angular/material/dialog";
import { CreateEventDialogComponent } from "../create-event-dialog/create-event-dialog.component";
import { endOfHour, startOfHour } from 'date-fns';
import { AppointmentService } from "../../services/appointment.service";
import { Appointment, AppointmentInfo, AppointmentStatus, CalendarData } from "../../models/appointment";
import { SessionService } from "../../services/session.service";
import { User } from "../../models/user";
import { ConfirmEventDialogComponent } from "../confirm-event-dialog/confirm-event-dialog.component";
import { ViewEventDialogComponent } from "../view-event-dialog/view-event-dialog.component";
import { MatSelectionListChange } from "@angular/material/list";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {

  public user?: User;
  public viewDate = new Date()
  public locale: string = 'ru';
  public loading: boolean = false;
  public appointments: CalendarEvent<AppointmentInfo>[] = [];

  @Input() public calendarData: CalendarData = { users: [] };
  @Output() public setSelectedUserId = new EventEmitter<string>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService,
    private readonly sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {
    this.sessionService.getSession()
      .subscribe(user => this.user = user)
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

    dialogRef.afterClosed().subscribe((result: Required<Appointment>) => {
      if (result) {
        this.appointmentService.saveAppointment(result).subscribe(
          () => this.reloadEvents()
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
    if (this.calendarData.attendeeId) {
      this.appointmentService.getContractorAppointments(this.calendarData.attendeeId)
        .subscribe(appointments => {
          this.loading = false;
          this.appointments = appointments;
        });
    } else {
      this.appointmentService.getAppointments()
        .subscribe(appointments => {
          this.loading = false;
          this.appointments = appointments;
        });
    }
  }

}
