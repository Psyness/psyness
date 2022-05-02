import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserResponse } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly apiGatewayUrl: string = environment.apiGatewayUrl
  private readonly httpClient: HttpClient;
  private currentUser?: User;


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getSession(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser)
    }
    return this.httpClient.get<UserResponse>(`${this.apiGatewayUrl}/sessions/me`, {withCredentials: true})
      .pipe(
        map(event => ({
          username: event.username,
          provider: event.provider,
          lastName: event.last_name,
          firstName: event.first_name
        })),
        tap(currentUser => {
          this.currentUser = currentUser
        })
      );
  }

  getGoogleLoginUrl(): string {
    return `${this.apiGatewayUrl}/login/google`;
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.apiGatewayUrl}/logout`, {withCredentials: true})
  }

}
