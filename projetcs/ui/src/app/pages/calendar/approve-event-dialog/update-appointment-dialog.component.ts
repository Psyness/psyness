import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppointmentStatus } from "../../../models/appointment";

@Component({
  selector: 'app-approve-event-dialog',
  templateUrl: './update-appointment-dialog.component.html',
  styleUrls: ['./update-appointment-dialog.component.css']
})
export class UpdateAppointmentDialogComponent {

  constructor(
    public readonly dialogRef: MatDialogRef<UpdateAppointmentDialogComponent>,
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
