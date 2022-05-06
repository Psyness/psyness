import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import { User, UserListResponse } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findPsychologistClients(): Observable<User[]> {
    return this.httpClient.get<UserListResponse>(`${environment.apiGatewayUrl}/clients`, {withCredentials: true})
      .pipe(
        map(result => result.users.map(user => ({
            username: user.username,
            lastName: user.last_name,
            firstName: user.first_name
          }))
        )
      );
  }


}
