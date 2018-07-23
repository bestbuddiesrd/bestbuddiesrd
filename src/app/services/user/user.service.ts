import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
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
}
