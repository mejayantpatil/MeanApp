import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: Http, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }

  public getUserDetails(): any {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: string , user?: any): Observable<any> {
    let base;
  
    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, {headers: new Headers({ Authorization: `Bearer ${this.getToken()}` })});
    }
  
    const request = base.pipe(
      map((data: any) => {
        if (data.json().token) {
          this.saveToken(data.json().token);
        }
        return data.json();
      })
    );
  
    return request;
  }

  public register(user: any): Observable<any> {
    return this.request('post', 'register', user);
  }
  
  public login(user: any): Observable<any> {
    return this.request('post', 'auth/login', user);
  }
  
  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }
}