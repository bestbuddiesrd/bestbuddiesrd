import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  options: HttpHeaders = new HttpHeaders().set(
    "Content-type",
    "application/json"
  );
  url: string = "http://bestbuddies.hajconsulting.net/Service/Service.asmx/";
  constructor(private http: HttpClient) {}

  login(credentials) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          "http://api.bestbuddiesrd.ml/v1/authentication/login",
          JSON.stringify(credentials)
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  registerOneToOne(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.url + "RegisterOneToOne", JSON.stringify(data), {
          headers: this.options
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  registerPromoter(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.url + "RegisterPromoter", JSON.stringify(data), {
          headers: this.options
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getHobbies() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.url + "GetHobbies", {
          headers: this.options
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getSports() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.url + "GetSports", {
          headers: this.options
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
