import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEvent } from "angular-calendar";
import { AppointmentService } from "../../services/appointment.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-psychologist',
  templateUrl: './psychologist.component.html',
  styleUrls: ['./psychologist.component.css']
})
export class PsychologistComponent implements OnInit {

  public viewDate = new Date()
  public locale: string = 'ru';
  public appointments$: Observable<CalendarEvent[]>

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly route: ActivatedRoute
  ) {
    const { psychologistId } = this.route.snapshot.params;
    this.appointments$ = this.appointmentService.getContractorAppointments(psychologistId)
  }

  ngOnInit(): void {
  }

}
