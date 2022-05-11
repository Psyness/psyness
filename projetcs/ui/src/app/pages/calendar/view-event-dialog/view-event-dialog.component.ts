import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppointmentStatus } from "../../../models/appointment";

@Component({
  selector: 'app-view-event-dialog',
  templateUrl: './view-event-dialog.component.html',
  styleUrls: ['./view-event-dialog.component.css']
})
export class ViewEventDialogComponent {

  constructor(
    public readonly dialogRef: MatDialogRef<ViewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appointmentId: string
  ) {
    console.log(appointmentId)
  }

  cancelAppointment() {
    this.dialogRef.close({
      appointmentId: this.appointmentId,
      status: AppointmentStatus.CANCELLED
    });
  }

  close() {
    this.dialogRef.close();
  }

}
