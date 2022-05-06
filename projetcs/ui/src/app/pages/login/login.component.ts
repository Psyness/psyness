import { Component } from '@angular/core';
import { SessionService } from "../../services/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private sessionService: SessionService) {
  }

  redirectToGoogleLogin(): void {
    window.location.href = this.sessionService.getGoogleLoginUrl()
  }

}
