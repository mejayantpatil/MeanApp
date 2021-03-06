import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApolloModule } from 'apollo-angular';
import { client } from '../graphql.client';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import {
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatGridListModule
} from '@angular/material';
import 'hammerjs';
// import 'jquery';
// import 'fullcalendar';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { ReactComponent } from './react';
import { ProfileComponent } from './profile';
//import { angularProfileCard } from '../../components/main-profile/index';
import { NoContentComponent } from './no-content';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import '../styles/styles.scss';
import '../styles/headings.css';
import {ButtonModule, CardModule, ChartModule, ProgressBarModule, 
  AutoCompleteModule, ScheduleModule, DialogModule, CalendarModule, 
  DropdownModule,
  DataTableModule,
  InputTextModule,
  CheckboxModule,
  RadioButtonModule,
  InputTextareaModule,
  SidebarModule,
  ProgressSpinnerModule,
  ConfirmDialogModule,
  ConfirmationService} from 'primeng/primeng';
import { SettingsComponent } from './settings';
import { ScheduleComponent } from './schedule';
import { WorkorderComponent } from './workorder/workorder.component';
import { WorkcenterComponent } from './workcenter/workcenter.component';
import { WorkOrderService } from './workorder/workorder.service';
import { MachineComponent } from './machine';
import { MachineService } from './machine/machine.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AuthGuardService } from './auth/authGuard.service';
import { AuthenticationService } from './auth/authentication.service';
import { PlantService } from './plant/plant.service';
import { PlantComponent } from './plant';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    ReactComponent,
    ProfileComponent,
    SettingsComponent,
    ScheduleComponent,
    WorkorderComponent,
    WorkcenterComponent,
    MachineComponent,
    LoginComponent,
    PlantComponent,
    NoContentComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CardModule,
    ChartModule,
    AutoCompleteModule,
    ScheduleModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    ProgressBarModule,
    DataTableModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    HttpModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    ApolloModule.forRoot(client),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    WorkOrderService,
    MachineService,
    LoginService,
    AuthGuardService,
    AuthenticationService,
    PlantService,
    ConfirmationService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
