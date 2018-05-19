import { Component, OnInit } from '@angular/core';
import { Car } from '../workcenter/workcenter.model';
import { WorkOrderService } from './workorder.service';
import { Response } from '@angular/http';

const ORDER = 'Order';
const SUBORDER = 'subOrder';

@Component({
  selector: 'workorder',  // <home></home>
  styleUrls: [ './workorder.component.scss' ],
  templateUrl: './workorder.component.html'
})

export class WorkorderComponent {
    selectedCity2: City;
    cities2: City[];
    loading: boolean;
    cars: Car[];
    cols: any[];
    toggle: boolean = false;
    type: string;
    order: string;
    subOrder: string;

    constructor(private workOrderService: WorkOrderService) {
        this.order = ORDER;
        this.subOrder = SUBORDER;
        //An array of cities
        this.cities2 = [
            {name:'Select Machine ID', code:null},
            {name: 'M1', code: 'NY'},
            {name: 'M2', code: 'RM'},
            {name: 'M3', code: 'LDN'},
            {name: 'M4', code: 'IST'},
            {name: 'M5', code: 'PRS'}
        ];
        this.loading = true;
        const res = {
            "data": [
                {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
                {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
                {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
                {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
                {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
                {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
                {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
                {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
            ]
        };        
        this.cars = res.data;
        this.cols = [
            {field: 'vin', header: 'Workorder ID'},
            {field: 'year', header: 'Priority'},
            {field: 'brand', header: 'Due Date'},
            {field: 'color', header: 'Scheduled Date'},
            {field: 'color', header: 'Exp Date'},
            {field: 'color', header: 'Status'}
        ];
        this.workOrderService.getData()
        .subscribe((res) => {
            console.log(res.json());    
        });
    }
    addWorkOrder() {
        this.type = ORDER;
        this.toggle = true;
    }
    
    addSubkOrder() {
        this.type = SUBORDER;
        this.toggle = true;
    }

    submit(type: string) {
        if(type === this.order) {
            console.log(this.selectedCity2);
        } else {
            console.log(this.selectedCity2);
        }
        this.toggle = false;
    }
}

interface City {
    name: string;
    code: string;
  }
