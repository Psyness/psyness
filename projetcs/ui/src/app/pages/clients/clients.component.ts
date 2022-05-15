import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CalendarData } from "../../models/appointment";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public calendarData: CalendarData = { users: [] };
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findClients()
      .subscribe(users => this.calendarData = { ...this.calendarData, users })
  }

  public setSelectedUserId(attendeeId?: string) {
    this.calendarData = { ...this.calendarData, attendeeId };
  }

  createInvitation() {
    this.userService.createInvitation()
      .subscribe(invitationUrl => this.snackBar.open(invitationUrl, 'Close'))
  }
}
