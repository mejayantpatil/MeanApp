import { Component, OnInit } from '@angular/core';
import { MachineService } from './machine.service';

export interface Machine {
machineId: string,
name: string
}

@Component({
  selector: 'machine',  // <home></home>
  styleUrls: [ './machine.component.scss' ],
  templateUrl: './machine.component.html'
})
export class MachineComponent {
  toggle: boolean = false;
  machine: Machine;
  machines: Machine[] = [];
  loading: boolean = false;

  constructor(private machineService: MachineService) {
    this.getMachines();    
  }
  
  getMachines() {
    this.loading = true;
    this.machineService.getMachines().subscribe(machines => {
        this.loading = false;
        this.machines = machines.json();
    });
  }

  initForm() {
    this.machine = {
        name: '',
        machineId: ''
    }
  }

  addMachine() {
      this.initForm();
      this.toggle = true;
  }

  save() {
      this.machineService.addMachine(this.machine).subscribe(machine => {
        this.toggle = false;
        this.initForm();
        this.getMachines();
      });
  }

  cancel() {
      this.initForm();
      this.toggle = false;
  }
}