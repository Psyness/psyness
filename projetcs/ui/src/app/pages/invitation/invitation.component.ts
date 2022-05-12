import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent {

  constructor(
    private readonly userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  getAcceptInvitationLink(): void {
    const { invitationId } = this.route.snapshot.params;
    window.location.href = this.userService.getAcceptInvitationLink(invitationId);
  }

}
