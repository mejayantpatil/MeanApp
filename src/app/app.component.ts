/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { PostsService } from './posts/posts.service';
import { AuthenticationService } from './auth/authentication.service';
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
    <header>
      <mat-toolbar color="primary">
        <a class="links" *ngIf="auth.isLoggedIn()" (click)="display = true">
          <i class="fa fa-bars" ></i>
        </a>
        <a [routerLink]="['/']" class="logotTxt">Company Name</a>
        <a class="links" *ngIf="auth.isLoggedIn()" [routerLink]="['/']">Home</a>
        <a class="links" *ngIf="auth.isLoggedIn()" [routerLink]="['/workorder']">Work Order</a>
        <a class="links" *ngIf="auth.isLoggedIn()" [routerLink]="['/workcenter']">Work Center</a>
        <a class="links" *ngIf="auth.isLoggedIn()" [routerLink]="['/machine']">Machine</a>
        <a class="links" *ngIf="auth.isLoggedIn()" [routerLink]="['/schedule']">Schedule</a>        
        <a class="links" *ngIf="auth.isLoggedIn()" [routerLink]="['/settings']">Settings</a>
        <a class="links user" *ngIf="auth.isLoggedIn()" (click)="logout()">Logout</a>        
      </mat-toolbar>
    </header>
    <p-sidebar [(visible)]="display">
      Content
    </p-sidebar>
    <router-outlet></router-outlet>
    <footer>
    </footer>
  `,
  providers: [PostsService]
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Mean stack starter';
  public url = 'https://mean.io';
  display: boolean = false;
  constructor(
    public appState: AppState,
    private auth: AuthenticationService
  ) { }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  logout() {
    this.auth.logout();
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
