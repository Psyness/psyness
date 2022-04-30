import { Component, OnInit } from '@angular/core';
import { SplashService } from './splash.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private readonly splashService: SplashService) {
  }

  ngOnInit(): void {
    this.splashService.getSession().subscribe(session => console.log(session));
  }

}
