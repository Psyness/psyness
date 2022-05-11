import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import { User, UserFilter, UserListResponse } from "../models/user";
import { InvitationResponse } from "../models/invitation";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findPsychologistClients(options: UserFilter = {}): Observable<User[]> {
    return this.httpClient.get<UserListResponse>(`${environment.apiGatewayUrl}/contacts`, {
      params: { ...options },
      withCredentials: true
    })
      .pipe(
        map(result => result.users.map(user => ({
            id: user.id,
            username: user.username,
            lastName: user.last_name,
            firstName: user.first_name
          }))
        )
      );
  }

  createInvitation(): Observable<string> {
    return this.httpClient
      .post<InvitationResponse>(
        `${environment.apiGatewayUrl}/clients/invitations`,
        null,
        { withCredentials: true }
      )
      .pipe(
        map(result => (`${window.location.origin}/invitations/${result.id}`))
      )
  }

  getAcceptInvitationLink(invitationId: string) {
    return `${environment.apiGatewayUrl}/login/google/${invitationId}`;
  }


}
