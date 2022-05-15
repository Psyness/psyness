import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SessionService } from "../../services/session.service";
import { User, UserRole } from "../../models/user";
import { Router } from "@angular/router";

@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.css']
})
export class AuthorizedLayoutComponent implements OnInit {

  navigationItems = [
    { title: 'LAYOUT.NAV_ITEM_HOME', link: '/home', roles: [UserRole.CLIENT, UserRole.PSYCHOLOGIST] },
    { title: 'LAYOUT.NAV_ITEM_CLIENTS', link: '/clients', roles: [UserRole.PSYCHOLOGIST] },
    { title: 'LAYOUT.NAV_ITEM_PSYCHOLOGISTS', link: '/psychologists', roles: [UserRole.CLIENT] },
    { title: 'LAYOUT.NAV_ITEM_TASKS', link: '/tasks', roles: [UserRole.PSYCHOLOGIST, UserRole.CLIENT] }
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
