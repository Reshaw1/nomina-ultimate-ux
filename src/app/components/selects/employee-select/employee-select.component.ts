import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../employee/employee.service';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  styleUrls: ['./employee-select.component.scss']
})
export class EmployeeSelectComponent implements AgRendererComponent {

  employees: Employee[] = [];
  value: number;

  cellRendererParams: ICellRendererParams;

  constructor(private employeeService: EmployeeService) { }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.employeeService.getEmployee().subscribe((res: any) => {
      this.employees = res;
    })
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  onSelectionChanged($event) {
    this.cellRendererParams.node.setDataValue('1', this.value)
  }

}
