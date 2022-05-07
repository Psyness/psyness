import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public displayedColumns: string[] = ['username', 'firstName', 'lastName']
  public users: User[] = [];

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findPsychologistClients()
      .subscribe(users => {
        this.users = users
      });
  }

  createInvitation() {
    this.userService.createInvitation()
      .subscribe(invitationUrl => this.snackBar.open(invitationUrl, 'Close'))
  }

}
