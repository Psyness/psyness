import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servies/user.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private readonly splashService: UserService) {
  }

  ngOnInit(): void {
    this.splashService.getSession().subscribe(session => console.log(session));
  }

}
