import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Appointment } from "../../../models/appointment";
import { FormControl } from "@angular/forms";
import { debounce, interval, map, Observable, startWith } from "rxjs";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  public clientsControl = new FormControl();
  public clients?: Observable<User[]>

  constructor(
    public readonly dialogRef: MatDialogRef<EventDialogComponent>,
    private readonly userService: UserService,
    @Inject(MAT_DIALOG_DATA) public appointment: Appointment
  ) {
  }

  ngOnInit(): void {
    this.clientsControl.valueChanges
      .pipe(
        startWith(''),
        debounce(() => interval(400))
      )
      .subscribe(filter => this.clients = this.userService.findPsychologistClients({ filter }));
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
