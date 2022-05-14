import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppointmentStatus } from "../../models/appointment";

@Component({
  selector: 'app-confirm-create-event-dialog',
  templateUrl: './confirm-event-dialog.component.html',
  styleUrls: ['./confirm-event-dialog.component.css']
})
export class ConfirmEventDialogComponent {

  constructor(
    public readonly dialogRef: MatDialogRef<ConfirmEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appointmentId: string
  ) {
    console.log(appointmentId)
  }

  approveAppointment() {
    this.dialogRef.close({
      appointmentId: this.appointmentId,
      status: AppointmentStatus.APPROVED
    });
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
