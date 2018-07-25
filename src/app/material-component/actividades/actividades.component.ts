import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {


  constructor(public calendarService: CalendarService, public router: Router) { }

  public selectedMoments = [];
  public actividad: string = "";
  public lugar: string = "";
  public descripcion: string = "";


  ngOnInit() {
  }

  crearActividad() {
    if (!this.actividad || !this.lugar || !this.descripcion || this.selectedMoments.length < 2) {
      alert("Debe completar todos los campos correctamente");
    } else {
      let event: any = {
        title: this.actividad,
        location: this.lugar,
        calendarEvent: this.descripcion,
        dateFrom: this.selectedMoments[0],
        dateTo: this.selectedMoments[1],
        statusId: true
      }
      this.calendarService.postEvents(event).then(res => {
        this.router.navigate(["/dashboard/calendar"]);
      })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
