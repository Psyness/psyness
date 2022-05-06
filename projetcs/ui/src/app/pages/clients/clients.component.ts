import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public displayedColumns: string[] = ['username', 'firstName', 'lastName']
  public users: User[] = [];

  constructor(
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
      .subscribe(res => console.log(res))
  }

}
