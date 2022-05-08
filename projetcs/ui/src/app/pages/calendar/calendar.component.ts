import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from "@angular/material/dialog";
import { EventDialogComponent } from "./event-dialog/event-dialog.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events: CalendarEvent[] = []
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public showCreateEventDialog(event: { date: Date, sourceEvent: MouseEvent }) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '450px',
      data: { title: 'title', start: event.date, end: event.date },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
