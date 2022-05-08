import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Appointment } from "../../../models/appointment";
import { UserInfo } from "../../../models/user";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {

  @ViewChild('picker') picker: any;
  public startDateControl = new FormControl();
  public endDateControl = new FormControl();

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
