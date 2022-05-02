import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../servies/session.service';
import { User } from "../../models/user";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  public user?: User;

  constructor(private readonly splashService: SessionService) {
  }

  ngOnInit(): void {
    this.splashService.getSession()
      .subscribe(session => {
        console.log(session)
        this.user = session
      });
  }

}
