import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

interface User {
    username: string;
    password: string;
}

@Component({
  selector: 'login',  // <home></home>
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})

//TODO http://jasonwatmore.com/post/2017/02/22/mean-with-angular-2-user-registration-and-login-example-tutorial
// Implement login 
export class LoginComponent implements OnInit {
  user: User;
  err: string = '';
  constructor(private loginService: LoginService, private router: Router, private auth: AuthenticationService) {
    this.user = { 
        username:'',
        password:''
    };
  }

  ngOnInit() {
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }
  authUser() {
      this.auth.login(this.user).subscribe(res => {
        this.router.navigate(['']);
      }, error=>{
        this.err = error.json().message;
        setTimeout(()=>{
          this.err = '';
        }, 2000);
        console.log(error);
      });
      // this.loginService.authUser(this.user).subscribe(res => {
      //   localStorage.setItem('mean-token', res.json().token);
      //   this.router.navigate(['']);
      // });
  }
  
}