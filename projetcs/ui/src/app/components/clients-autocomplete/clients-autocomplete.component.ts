import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounce, interval, Observable, startWith } from "rxjs";
import { FormControl } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { User, UserInfo } from "../../models/user";
import { Appointment } from "../../models/appointment";
import { MatOption } from "@angular/material/core";

@Component({
  selector: 'app-clients-autocomplete',
  templateUrl: './clients-autocomplete.component.html',
  styleUrls: ['./clients-autocomplete.component.css']
})
export class ClientsAutocompleteComponent implements OnInit {

  public clientsControl = new FormControl();
  public appointment: Appointment = { start: new Date(), end: new Date() }
  public clients?: Observable<User[]>

  @Output() public setClientId = new EventEmitter<UserInfo>();

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.clientsControl.valueChanges
      .pipe(
        startWith(''),
        debounce(() => interval(400))
      )
      .subscribe(filter => {
        this.clients = this.userService.findPsychologistClients({ filter })
      });
  }

  onClientSelected({ option }: { option: MatOption }) {
    this.setClientId.emit({ clientId: option.id, clientFullName: option.value })
  }

}
