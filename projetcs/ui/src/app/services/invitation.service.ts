import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private readonly httpClient: HttpClient) {
  }

  createInvitation() {
    return this.httpClient.post(`${environment.apiGatewayUrl}/invitations`, null, {withCredentials: true})
  }

}
