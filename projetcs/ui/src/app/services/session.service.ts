import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserResponse } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentUser?: User;

  constructor(private readonly httpClient: HttpClient) {
  }

  getSession(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser)
    }
    return this.httpClient.get<UserResponse>(`${environment.apiGatewayUrl}/sessions/me`, {withCredentials: true})
      .pipe(
        map(event => ({
          username: event.username,
          lastName: event.last_name,
          firstName: event.first_name
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
    return this.httpClient.get<void>(`${environment.apiGatewayUrl}/logout`, {withCredentials: true})
  }

}
