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
    workOrders: Car[];
    cols: any[];
    toggle: boolean = false;
    type: string;
    order: string;
    subOrder: string;
    scheduledTime: string;
    workorderId: string;
    processId: string;
    operationId: string;
    operationDesc: string;
    status: string;

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
        this.cols = [
            {field: 'workId', header: 'Workorder ID'},
            {field: 'priority', header: 'Priority'},
            {field: 'dueDate', header: 'Due Date'},
            {field: 'shceduledTime', header: 'Scheduled Date'},
            {field: 'expDate', header: 'Exp Date'},
            {field: 'satus', header: 'Status'}
        ];
        this.getWorkOrders();
    }

    getWorkOrders() {
        this.loading = true;
        this.workOrders = [];
        // GET work order list here
        this.workOrderService.getWorkOrders()
        .subscribe((res) => {
            this.loading =false;
            this.workOrders = res.json();
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
            const workOrder = {
                workId: this.workorderId,
                scheduledTime: this.scheduledTime,
                processId: this.processId,
                operationId: this.processId,
                operationDesc: this.operationDesc
            };
            
            this.workOrderService.addWorkOrder(workOrder).subscribe((workOrder: any) => {
                this.getWorkOrders();
            });

        } else {
            console.log(this.selectedCity2);
        }
        this.toggle = false;
    }

    cancel() {
        this.toggle = false;
    }
}

interface City {
    name: string;
    code: string;
  }
