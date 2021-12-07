import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { Department } from 'src/app/models/department';
import { DepartmentService } from '../../department/department.service';

@Component({
  selector: 'app-department-select',
  templateUrl: './department-select.component.html',
  styleUrls: ['./department-select.component.scss']
})
export class DepartmentSelectComponent implements AgRendererComponent {
  departments: Department[] = [];
  value: number;

  cellRendererParams: ICellRendererParams;

  constructor(private departmentService: DepartmentService) { }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.departmentService.getDepartment().subscribe((res: any) => {
      this.departments = res;
    })
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  onSelectionChanged($event) {
    this.cellRendererParams.node.setDataValue('8', this.value)
  }

}
