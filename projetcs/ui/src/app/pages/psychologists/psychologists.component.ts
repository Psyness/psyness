import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AppointmentService } from "../../services/appointment.service";
import { CalendarData } from "../../models/appointment";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-appointments',
  templateUrl: './psychologists.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./psychologists.component.css']
})
export class PsychologistsComponent implements OnInit {

  public calendarData: CalendarData = { appointments: [], users: [], loading: false };
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.reloadEvents();
    this.userService.findPsychologists()
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

}
