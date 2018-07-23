import { Router } from "@angular/router";
import { UserService } from "./../services/user/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: any = "";
  password: any = "";
  constructor(private userService: UserService, public router: Router) {}

  ngOnInit() {}

  login() {
    let payload: any = {
      email: this.email,
      password: this.password
    };
    console.log(payload);
    this.userService
      .login(payload)
      .then(res => {
        this.router.navigate(["/dashboard/starter"]);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
