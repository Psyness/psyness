import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SplashService {

  readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getSession(): Observable<any> {
    console.log('Get session!!');
    return this.httpClient.get('http://localhost:8000/sessions/me');
  }

}
