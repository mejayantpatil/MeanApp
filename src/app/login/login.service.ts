import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginService {
    constructor(private http: Http) {
        
      }

    authUser(user: any) {
        return this.http.post('http://localhost:4040/api/auth/login', user);
    }
}