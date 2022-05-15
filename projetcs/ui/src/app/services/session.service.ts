import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionUser, UserResponse } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentUser?: SessionUser;

  constructor(private readonly httpClient: HttpClient) {
  }

  getSession(): Observable<SessionUser> {
    if (this.currentUser) {
      return of(this.currentUser)
    }
    return this.httpClient.get<UserResponse>(`${environment.apiGatewayUrl}/sessions/me`, { withCredentials: true })
      .pipe(
        map(user => ({
          id: user.id,
          username: user.username,
          lastName: user.last_name,
          firstName: user.first_name,
          roles: user.roles
        })),
        tap(currentUser => {
          this.currentUser = currentUser
        })
      );
  }

  getGoogleLoginUrl(): string {
    return `${environment.apiGatewayUrl}/login/google`;
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiGatewayUrl}/logout`, { withCredentials: true })
  }

}
