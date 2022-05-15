import { Directive, ElementRef, Input } from '@angular/core';
import { UserRole } from "../models/user";
import { SessionService } from "../services/session.service";

@Directive({
  selector: '[appAllowedRoles]'
})
export class AllowedRolesDirective {

  @Input() public roles: UserRole[] = []

  constructor(
    private el: ElementRef,
    private sessionService: SessionService
  ) {
    sessionService.getSession().subscribe(user => {
      const isPermitted = this.roles.some(role => user.roles.includes(role))
      if (!isPermitted) {
        this.el.nativeElement.style.display = 'none';
      }
    })
  }

}
