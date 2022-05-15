import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CalendarData } from "../../models/appointment";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-appointments',
  templateUrl: './psychologists.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./psychologists.component.css']
})
export class PsychologistsComponent implements OnInit {

  public calendarData: CalendarData = { users: [], alwaysShowUserCalendar: false };
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor(
    private readonly dialog: MatDialog,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findPsychologists()
      .subscribe(users => this.calendarData = { ...this.calendarData, users })
  }

  public setSelectedUserId(attendeeId?: string) {
    this.calendarData = { ...this.calendarData, attendeeId };
  }

}
