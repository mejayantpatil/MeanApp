import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class MachineService {
    constructor(private http: Http) {
        
      }

    getMachines() {
        return this.http.get('http://localhost:4040/api/machine');
    }

    addMachine(machine: any) {
        return this.http.post('http://localhost:4040/api/machine', machine);
    }
}