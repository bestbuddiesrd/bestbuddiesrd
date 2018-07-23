import { UserService } from "./../services/user/user.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  applicationType: number = 1;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      city: ["", Validators.required],
      dateOfBirth: [new Date("01-01-2000"), Validators.required],
      phone: ["", Validators.required],
      gender: ["", Validators.required],
      applicationType: ["", Validators.required],
      associated: [""],
      pWD: ["123456"]
    });
    this.secondFormGroup = this.formBuilder.group({
      buddy: ["", Validators.required],
      medicalIssue: ["", Validators.required],
      school: ["", Validators.required]
    });
  }

  toSecondStep() {
    this.applicationType = this.firstFormGroup.controls.applicationType.value;
    if (this.applicationType != 1) {
      this.firstFormGroup.controls.associated.setValue(false);
    } else {
      this.firstFormGroup.controls.associated.setValue(true);
    }
    console.log(this.firstFormGroup.value);
  }

  toThirdStep() {
    let data = Object.assign(
      {},
      this.firstFormGroup.value,
      this.secondFormGroup.value
    );
    console.log(data);
    this.userService
      .registerOneToOne(data)
      .then(res => {
        alert("Success");
      })
      .catch(err => {
        console.log(err);
      });
  }
}
