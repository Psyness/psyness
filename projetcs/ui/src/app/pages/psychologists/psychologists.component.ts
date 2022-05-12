import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-psychologists',
  templateUrl: './psychologists.component.html',
  styleUrls: ['./psychologists.component.css']
})
export class PsychologistsComponent implements OnInit {

  public displayedColumns: string[] = ['username', 'firstName', 'lastName', 'actions']
  public psychologists: User[] = [];

  constructor(
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findPsychologists()
      .subscribe(users => {
        this.psychologists = users
      });
  }

}
