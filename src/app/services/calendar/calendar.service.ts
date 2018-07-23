import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class CalendarService {

    constructor(private http: HttpClient) { }

    getEvents() {
        let options = new HttpHeaders().set('Content-type', 'application/json');
        return new Promise((resolve, reject) => {
            this.http.get(
                "http://bestbuddies.hajconsulting.net/Service/Service.asmx/GetEvents", { headers: options }
            )
                .subscribe(
                    res => {
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    });

        });
    }
}
