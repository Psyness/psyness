import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Appointment } from "../../../models/appointment";
import { UserInfo } from "../../../models/user";

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {

  constructor(
    public readonly dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appointment: Appointment
  ) {
  }

  onClientSelected(event: UserInfo) {
    this.appointment.clientId = event.clientId
    this.appointment.title = event.clientFullName
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
