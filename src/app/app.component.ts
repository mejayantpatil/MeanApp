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
        <a [routerLink]="['/']" class="logotTxt">Company Name</a>
        <a class="links" [routerLink]="['/']">Home</a>
        <a class="links" [routerLink]="['/workorder']">Work Order</a>
        <a class="links" [routerLink]="['/workcenter']">Work Center</a>
        <a class="links" [routerLink]="['/schedule']">Schedule</a>        
        <a class="links" [routerLink]="['/settings']">Settings</a>
        <a class="links user" [routerLink]="['/']">User</a>        
      </mat-toolbar>
    </header>
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

  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */