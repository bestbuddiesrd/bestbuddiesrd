import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Router } from '@angular/router';


/** @title Simple form field */
@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
    participants: number;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private calendarService: CalendarService, public router: Router) { }

    postReport(data, participants, review) {
        console.log(participants)
        console.log(data.eventId)
        console.log(review)

        if (!participants || !review) {
            alert("Debe completar todos los campos correctamente");
        } else {
            let report: any = {
                participants: participants,
                reviews: review,
                eventID: data.eventId,
            }
            this.calendarService.createReport(report).then(res => {
                this.router.navigate(["/dashboard/events-table"]);
                alert("Reporte creado exitosamente!");

            })
                .catch(err => {
                    console.log(err);
                });
        }



    }
}

