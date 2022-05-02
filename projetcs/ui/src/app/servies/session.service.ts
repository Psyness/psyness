import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserResponse } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  readonly apiGatewayUrl: string = environment.apiGatewayUrl
  readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getSession(): Observable<User> {
    return this.httpClient.get<UserResponse>(`${this.apiGatewayUrl}/sessions/me`, {withCredentials: true})
      .pipe(
        map(event => ({
          username: event.username,
          provider: event.provider,
          lastName: event.last_name,
          firstName: event.first_name
        }))
      );
  }

  getGoogleLoginUrl(): string {
    return `${this.apiGatewayUrl}/login/google`;
  }

}
