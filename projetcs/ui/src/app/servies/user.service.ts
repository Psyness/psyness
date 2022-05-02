import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiGatewayUrl: string = environment.apiGatewayUrl
  readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getSession(): Observable<any> {
    return this.httpClient.get(`${this.apiGatewayUrl}/sessions/me`, {withCredentials: true});
  }

}
