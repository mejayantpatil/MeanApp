import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class WorkOrderService {
    constructor(private http: Http) {
        
      }

    getData() {
        return this.http.get('http://localhost:4040/api/data');
    }
}