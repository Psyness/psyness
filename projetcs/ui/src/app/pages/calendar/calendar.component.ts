import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events = []
  public viewDate = new Date()
  public locale: string = 'ru';

  constructor() { }

  ngOnInit(): void {
  }

}
