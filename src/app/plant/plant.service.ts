import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class PlantService {
    constructor(private http: Http) {
        
      }

    getPlants() {
        return this.http.get('http://localhost:4040/api/plants');
    }

    addPlant(plant: any) {
        return this.http.post('http://localhost:4040/api/plants', plant);
    }

    updatePlant(id: string, plant: any) {
        return this.http.put('http://localhost:4040/api/plants/' + id, plant);
    }

    deletePlant(id: string) {
        return this.http.delete('http://localhost:4040/api/plants/' + id);
    }
}