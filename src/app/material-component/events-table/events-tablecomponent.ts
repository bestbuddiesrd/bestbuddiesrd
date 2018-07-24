import { Component } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'advanced-example-server',
  template: `
    <ng2-smart-table [settings]="settings" [source]="eventos" (custom)="route($event)" ></ng2-smart-table>
  `
})
export class EventsTableComponent {
  eventsList: any;
  events: any[] = [];
  eventos: any[];
  refresh: Subject<any> = new Subject();

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.getEvents("http://bestbuddies.hajconsulting.net/Service/Service.asmx/GetExpiredEvents")
      .then((res: any) => {
        this.eventsList = JSON.parse(res.d);
        this.eventsList.forEach(event => {
          this.events.push({
            id: event.ID,
            start: this.parseJsonDate(event.DateFrom),
            end: this.parseJsonDate(event.DateTo),
            title: event.Title,
            location: event.Location,
          });
        });
        this.refresh.next();
        this.eventos = this.events;
      }).catch(err => {
        console.log(err);
      });;
  }

  settings = {
    actions: {
      edit: false,
      delete: false,
      add: false,
      position: 'right',
      custom: [{
        name: 'reports',
        title: 'Reporte de Evento'
      }]
    },
    columns: {
      title: {
        title: 'Título'
      },
      location: {
        title: 'Lugar'
      },
      start: {
        title: 'Fecha de Inicio'
      },
      end: {
        title: 'Fecha de Fin'
      }
    }
  };

  route(info) {
    console.log(info.data.id);
  }

  parseJsonDate(jsonDateString) {
    moment.locale('es-do');
    return moment(new Date(parseInt(jsonDateString.replace('/Date(', '')))).format('LLL');
  }
}
