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
  cellValue: number;

  cellRendererParams: ICellRendererParams;

  constructor(private employeeService: EmployeeService) { }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.cellRendererParams = params;
    this.employeeService.getEmployee().subscribe((res: any) => {
      this.employees = res;
      this.cellValue = params.node.data.employeeID;
    })
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  onSelectionChanged(event) {
    console.log(event)
    console.log(this.cellValue)
    this.cellRendererParams.node.setDataValue('1', this.cellValue);
  }

}
