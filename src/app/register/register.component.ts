import { UserService } from "./../services/user/user.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  commonForm: FormGroup;
  oneToOneForm: FormGroup;
  activitiesForm: FormGroup;
  promoterForm: FormGroup;
  applicationType: number = 0;
  sports: any;
  hobbies: any;
  chosenSports: any;
  chosenHobbies: any;
  mergedOneToOne: any;
  mergedPromoter: any;
  careers: any = [
    {
      id: 1,
      name: "Administracion de Empresas"
    },
    {
      id: 2,
      name: "Mercadeo"
    },
    {
      id: 3,
      name: "Comunicación Publicataria"
    },
    {
      id: 4,
      name: "Ingeniería en TIC"
    },
    {
      id: 5,
      name: "Ingeniería Industrial"
    },
    {
      id: 6,
      name: "Ingeniería Civil"
    },
    {
      id: 7,
      name: "Medicina"
    },
    {
      id: 8,
      name: "Administración Hotelera"
    },
    {
      id: 9,
      name: "Contabilidad"
    },
    {
      id: 10,
      name: "Derecho"
    }
  ];
  universities: any = [
    {
      id: 1,
      name: "UNIBE"
    },
    {
      id: 2,
      name: "PUCMM"
    },
    {
      id: 3,
      name: "INTEC"
    },
    {
      id: 4,
      name: "APEC"
    }
  ];
  comissions: any = [
    {
      id: 1,
      name: "Colegios y One to One"
    },
    {
      id: 2,
      name: "Comunicaciones"
    },
    {
      id: 3,
      name: "Eventos y Recaudación de Fondos"
    },
    {
      id: 4,
      name: "TIC"
    },
    {
      id: 5,
      name: "Inclusión Laboral"
    },
    {
      id: 6,
      name: "Promoter Asociado"
    },
    {
      id: 7,
      name: "Coordinación General"
    },
    {
      id: 8,
      name: "Relación con Padres e Instituciones"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.commonForm = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.email],
      city: ["", Validators.required],
      dateOfBirth: [new Date("01-01-2000"), Validators.required],
      phone: ["", Validators.required],
      gender: ["", Validators.required],
      applicationType: ["", Validators.required],
      pWD: ["123456"]
    });
    this.oneToOneForm = this.formBuilder.group({
      buddy: ["", Validators.required],
      medicalIssue: ["", Validators.required],
      associated: ["", Validators.required],
      school: ["", Validators.required]
    });
    this.promoterForm = this.formBuilder.group({
      university: ["", Validators.required],
      career: ["", Validators.required],
      medicalIssue: ["", Validators.required],
      isWorking: ["", Validators.required],
      Comission: ["", Validators.required]
    });

    this.userService
      .getHobbies()
      .then((res: any) => {
        this.hobbies = JSON.parse(res.d);
      })
      .catch(err => {
        console.log(err);
      });

    this.userService
      .getSports()
      .then((res: any) => {
        this.sports = JSON.parse(res.d);
      })
      .catch(err => {
        console.log(err);
      });
  }

  toSecondStep() {
    this.applicationType = this.commonForm.controls.applicationType.value;
    if (this.applicationType == 0) {
      this.oneToOneForm.controls.associated.setValue(false);
    } else if (this.applicationType == 1) {
      this.oneToOneForm.controls.associated.setValue(true);
    }
  }

  toThirdStep() {
    if (this.applicationType < 2) {
      this.mergedOneToOne = Object.assign(
        {},
        this.commonForm.value,
        this.oneToOneForm.value
      );
    } else if (this.applicationType == 2) {
      this.mergedPromoter = Object.assign(
        {},
        this.commonForm.value,
        this.promoterForm.value
      );
    }
  }

  completeForm() {
    if (this.applicationType < 2) {
      this.userService
        .registerOneToOne(this.mergedOneToOne)
        .then((res: any) => {
          if (res) {
            let data = {
              oneToOne: res.d,
              activites: this.chosenHobbies.concat(this.chosenSports)
            };
            console.log(data);
            this.userService
              .setActivities(data)
              .then((success: any) => {
                console.log(success);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.applicationType == 2) {
      this.userService
        .registerPromoter(this.mergedPromoter)
        .then(res => {
          alert("Success");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
