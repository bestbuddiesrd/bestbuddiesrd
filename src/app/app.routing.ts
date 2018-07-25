import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [{
  path: 'dashboard',
  component: FullComponent,
  children: [{
    path: 'dashboard',
    redirectTo: 'starter',
    pathMatch: 'full'
  }, {
    path: '',
    loadChildren: './material-component/material.module#MaterialComponentsModule'
  }, {
    path: '',
    loadChildren: './starter/starter.module#StarterModule'
  }]
}, {
  path: '',
  component: LoginComponent,
}
];

