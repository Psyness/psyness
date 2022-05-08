import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Appointment } from "../../../models/appointment";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  public clientsControl = new FormControl();
  public clients = [
    { id: '1', name: 'name1' },
    { id: '2', name: 'name2' }
  ]
  public filteredClients?: Observable<{ id: string, name: string }[]>

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appointment: Appointment
  ) {
  }

  ngOnInit(): void {
    this.filteredClients = this.clientsControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.clients.filter(client => client.name.toLowerCase().includes(filterValue));
  }

}
