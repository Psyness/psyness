import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CalendarData } from "../../models/appointment";
import { MatDialog } from "@angular/material/dialog";
import { AppointmentService } from "../../services/appointment.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public calendarData: CalendarData = { appointments: [], users: [], loading: false };
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.reloadEvents();
    this.userService.findClients()
      .subscribe(users => this.calendarData = { ...this.calendarData, users })
  }

  public setSelectedUserId(userId?: string) {
    this.calendarData.attendeeId = userId;
    this.reloadEvents();
  }

  public reloadEvents() {
    this.calendarData = { ...this.calendarData, loading: true };
    if (this.calendarData.attendeeId) {
      this.appointmentService.getContractorAppointments(this.calendarData.attendeeId)
        .subscribe(appointments => this.calendarData = { ...this.calendarData, appointments, loading: false });
    } else {
      this.appointmentService.getAppointments()
        .subscribe(appointments => this.calendarData = { ...this.calendarData, appointments, loading: false });
    }
  }

  createInvitation() {
    this.userService.createInvitation()
      .subscribe(invitationUrl => this.snackBar.open(invitationUrl, 'Close'))
  }
}
