import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../servies/session.service';
import { User } from "../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user?: User;

  constructor(private readonly sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionService.getSession()
      .subscribe(session => {
        console.log(session)
        this.user = session
      });
  }

}
