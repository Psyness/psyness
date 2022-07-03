import { Component, OnInit } from '@angular/core';
import { UserSchedule, Week, WorkingTime } from "../../models/schedule";
import { MatDialog } from "@angular/material/dialog";
import { WorkingTimeDialogComponent } from "./components/working-time-dialog/working-time-dialog.component";
import { AppointmentService } from "../../services/appointment.service";
import { startOfWeek } from "date-fns";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public week: Week = this.createEmptyWeek();
  public startTime: number = startOfWeek(Date.now()).valueOf();
  public days: string[] = Object.keys(this.week);

  constructor(
    private readonly dialog: MatDialog,
    private readonly appointmentService: AppointmentService
  ) {
  }

  ngOnInit(): void {
  }

  public deleteTime(times: Array<WorkingTime>, time: WorkingTime) {
    const index = times.indexOf(time);
    times.splice(index, 1);
  }

  public openAddTimeDialog(times: Array<WorkingTime>) {
    const dialogRef = this.dialog.open(WorkingTimeDialogComponent, { width: '450px' });

    dialogRef.afterClosed().subscribe((result: WorkingTime) => {
      if (!result) {
        return;
      }

      times.push(result)
    });
  }

  public saveSchedule() {
    const schedule: UserSchedule = {
      startTime: this.startTime,
      type: 'WEEKLY',
      weeks: [this.week]
    }
    this.appointmentService.saveSchedule(schedule).subscribe((schedule) => {
      this.week = schedule.weeks[0]
      this.startTime = schedule.startTime
    })
  }

  private createEmptyWeek(): Week {
    return {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };
  }

}
