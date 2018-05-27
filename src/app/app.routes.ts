import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { ReactComponent } from './react';
import { ProfileComponent } from './profile';
//import { angularProfileCard } from '../../components/main-profile/index';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { SettingsComponent } from './settings';
import { ScheduleComponent } from './schedule';
import { WorkorderComponent } from './workorder/workorder.component';
import { WorkcenterComponent } from './workcenter/workcenter.component';
import { MachineComponent } from './machine';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/authGuard.service';
import { PlantComponent } from './plant';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'posts', loadChildren: './posts#PostsModule' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'react', component: ReactComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'workorder', component: WorkorderComponent },
  { path: 'workcenter', component: WorkcenterComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'machine', component: MachineComponent },
  { path: 'plant', component: PlantComponent },
  { path: '**',    component: NoContentComponent },
];
