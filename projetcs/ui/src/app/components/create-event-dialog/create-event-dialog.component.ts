import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CreateAppointmentRequest } from "../../models/appointment";
import { UserInfo } from "../../models/user";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent {

  @ViewChild('picker') startPicker: any;
  @ViewChild('picker') endPicker: any;
  public startDateControl = new FormControl();
  public endDateControl = new FormControl();
  public allowSelectAttendee: boolean;

  constructor(
    public readonly dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appointment: CreateAppointmentRequest
  ) {
    this.allowSelectAttendee = appointment.attendeeId === undefined;
  }

  onClientSelected(event: UserInfo) {
    this.appointment.attendeeId = event.userId
    this.appointment.title = event.clientFullName
  }

  save() {
    this.dialogRef.close(this.appointment);
  }

  close() {
    this.dialogRef.close();
  }

}
