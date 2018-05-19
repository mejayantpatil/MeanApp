import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class WorkOrderService {
    constructor(private http: Http) {
        
      }

    getWorkOrders() {
        return this.http.get('http://localhost:4040/api/work');
    }

    addWorkOrder(workOrder: any) {
        return this.http.post('http://localhost:4040/api/work', workOrder);
    }
}