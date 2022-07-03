import { Component, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-working-time-dialog',
  templateUrl: './working-time-dialog.component.html',
  styleUrls: ['./working-time-dialog.component.css']
})
export class WorkingTimeDialogComponent {

  @ViewChild('picker') startPicker: any;
  @ViewChild('picker') endPicker: any;
  public startDateControl = new FormControl();
  public endDateControl = new FormControl();

  constructor(
    public readonly dialogRef: MatDialogRef<WorkingTimeDialogComponent>,
  ) {

  }

  public save() {
    this.dialogRef.close({ startTime: this.startDateControl.value, endTime: this.endDateControl.value });
  }

  public close() {
    this.dialogRef.close();
  }

}
