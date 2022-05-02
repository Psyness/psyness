import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SessionService } from "../../servies/session.service";
import { User } from "../../models/user";
import { Router } from "@angular/router";

@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.css']
})
export class AuthorizedLayoutComponent implements OnInit {

  navigationItems = [
    {title: 'LAYOUT.NAV_ITEM_HOME', link: '/home'},
    {title: 'LAYOUT.NAV_ITEM_CLIENTS', link: '/clients'},
    {title: 'LAYOUT.NAV_ITEM_CALENDAR', link: '/calendar'},
    {title: 'LAYOUT.NAV_ITEM_TASKS', link: '/tasks'}
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user?: User;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.sessionService.getSession()
      .subscribe(session => {
        console.log(session)
        this.user = session
      });
  }

  logout(): void {
    this.sessionService.logout()
      .subscribe(() => {
        this.router.navigateByUrl('/login')
      })
  }

}
