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

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'posts', loadChildren: './posts#PostsModule' },
  { path: 'profile', component: ProfileComponent },
  { path: 'react', component: ReactComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'workorder', component: WorkorderComponent },
  { path: 'workcenter', component: WorkcenterComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'machine', component: MachineComponent },
  { path: '**',    component: NoContentComponent },
];
