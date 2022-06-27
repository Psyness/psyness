import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../services/appointment.service";
import {CalendarConfig} from "../../models/appointment";

@Component({
  selector: 'app-one-time-link',
  templateUrl: './one-time-link.component.html',
  styleUrls: ['./one-time-link.component.css']
})
export class OneTimeLinkComponent implements OnInit {

  public calendarData: CalendarConfig = {users: [], alwaysShowUserCalendar: true};

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const {oneTimeLinkId} = this.route.snapshot.params;
    this.calendarData.oneTimeLinkId = oneTimeLinkId;
  }

  public setSelectedUserId(attendeeId?: string) {
    this.calendarData = { ...this.calendarData, attendeeId };
  }

}
