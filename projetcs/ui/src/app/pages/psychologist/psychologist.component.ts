import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { CalendarEvent } from "angular-calendar";
import { AppointmentService } from "../../services/appointment.service";
import { ActivatedRoute } from "@angular/router";
import { CreateEventDialogComponent } from "../../components/create-event-dialog/create-event-dialog.component";
import { endOfHour, startOfHour } from "date-fns";
import { Appointment, AppointmentInfo, AppointmentStatus } from "../../models/appointment";
import { ConfirmEventDialogComponent } from "../../components/confirm-event-dialog/confirm-event-dialog.component";
import { ViewEventDialogComponent } from "../../components/view-event-dialog/view-event-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SessionService } from "../../services/session.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-psychologist',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './psychologist.component.html',
  styleUrls: ['./psychologist.component.css']
})
export class PsychologistComponent implements OnInit {

  public psychologistId: string;
  public viewDate = new Date()
  public locale: string = 'ru';
  public user?: User;
  public appointments$?: Observable<CalendarEvent[]>

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService,
    private readonly sessionService: SessionService,
    private readonly route: ActivatedRoute
  ) {
    const { psychologistId } = this.route.snapshot.params;
    this.psychologistId = psychologistId;
  }


  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getContractorAppointments(this.psychologistId)
    this.sessionService.getSession().subscribe(user => this.user = user)
  }

  public showCreateEventDialog(event: { date: Date, sourceEvent: MouseEvent }) {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '450px',
      data: {
        start: startOfHour(event.date),
        end: endOfHour(event.date),
        title: 'Консультация',
        attendeeId: this.psychologistId
      },
    });

    dialogRef.afterClosed().subscribe((result: Required<Appointment>) => {
      if (result) {
        this.appointments$ = this.appointmentService.saveAppointment(result).pipe(
          mergeMap(() => this.appointmentService.getContractorAppointments(this.psychologistId))
        );
      }
    });
  }

  public showEditEventDialog(event: { event: CalendarEvent<AppointmentInfo> }) {
    if (event.event.meta?.hidden) {
      return;
    }
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
        this.appointments$ = this.appointmentService.updateAppointment(result.appointmentId, result.status).pipe(
          mergeMap(() => this.appointmentService.getContractorAppointments(this.psychologistId))
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
        this.appointments$ = this.appointmentService.updateAppointment(result.appointmentId, result.status).pipe(
          mergeMap(() => this.appointmentService.getContractorAppointments(this.psychologistId))
        );
      }
    });
  }

}
