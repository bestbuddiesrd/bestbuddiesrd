import { RegisterComponent } from "./register/register.component";
import { FullComponent } from "./layouts/full/full.component";
import { LoginComponent } from "./login/login.component";
import { Routes } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";

export const AppRoutes: Routes = [
  {
    path: "dashboard",
    component: FullComponent,
    children: [
      {
        path: "dashboard",
        redirectTo: "/starter",
        pathMatch: "full"
      },
      {
        path: "",
        loadChildren:
          "./material-component/material.module#MaterialComponentsModule"
      },
      {
        path: "",
        loadChildren: "./starter/starter.module#StarterModule"
      }
    ]
  },
  {
    path: "register",
    component: RegisterComponent},
    {
      path:"",
    component: LandingComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];
