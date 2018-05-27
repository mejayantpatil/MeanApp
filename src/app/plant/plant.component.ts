import { Component, OnInit } from '@angular/core';
import { Car } from '../workcenter/workcenter.model';
import { Response } from '@angular/http';
import { PlantService } from './plant.service';
import { ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'plant',
  styleUrls: [ './plant.component.scss' ],
  templateUrl: './plant.component.html'
})

export class PlantComponent {
    loading: boolean = false;
    plants: any;
    toggle: boolean = false;
    plant: any;
    plantId: string = '';

    constructor(private plantService: PlantService, private confirmationService: ConfirmationService) {
        this.getPlants();       
    }

    initializePlant() {
        this.plant = {
            name: '',
            address: '',
            city: '',
            state: '',
            country: '',
            pincode: ''
        }
    }

    getPlants() {
        this.loading = true;
        this.plants = [];
        this.plantService.getPlants()
        .subscribe((res) => {
            this.loading =false;
            this.plants = res.json();
        });
    }

    addPlant() {
        this.toggle = true;
        this.initializePlant();
    }

    editPlant(selectedPalnt: any) {
        this.plantId = selectedPalnt._id;
        this.plant = selectedPalnt;
        this.toggle = true;
    }

    deletePlant(selectedPlant: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.plantService.deletePlant(selectedPlant._id).subscribe(plant =>{
                    this.getPlants();
                    this.toggle = false;
                });
            }
        });
    }
    
    submit(plant: string) {
        if(this.plantId !== '') {
            this.plantService.updatePlant(this.plantId, plant).subscribe((plant: any) => {
                this.toggle = false;
                this.plantId = '';
                this.initializePlant();
                this.getPlants();
            });
        } else {
            this.plantService.addPlant(plant).subscribe((plant: any) => {
                this.toggle = false;
                this.initializePlant();
                this.getPlants();
            });
        }
    }

    cancel() {
        this.toggle = false;
        this.initializePlant();
    }
}
