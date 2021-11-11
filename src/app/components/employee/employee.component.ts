import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  gridEdited: boolean = false;
  selection: boolean = false;

  employee: Employee;
  department: Department = new Department();

  departments: Department[] = [];

  colDef : ColDef[] = [
    { field: 'id', colId: "0", headerName: 'ID', hide: true},
    { field: 'name', colId: "1", headerName: 'Nombre', filter: 'agTextColumnFilter'},
    { field: 'cardId', colId: "2", headerName: 'Cedula', filter: 'agTextColumnFilter'},
    { field: 'department.departmentName', colId: "3", headerName: 'Departament'},
    { field: 'job', colId: "4", headerName: 'Puesto', filter: 'agTextColumnFilter'},
    { field: 'salary', colId: '5', headerName: 'Salario', filter: 'agNumberColumnFilter'},
    { field: 'select', colId: "6", headerName: 'Seleccionar', checkboxSelection: true},
    { field: 'state', colId: "7", headerName: 'state', hide: true}
  ]

  defaultColDef = {
    // make every column editable
    editable: true,
    resizeable:false,
    suppressMovable:true,
    // make every column use 'text' filter by default
  }

  rowData : any = [
  ]

  gridOptions : GridOptions ;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employee = new Employee();

    this.gridOptions = {
      onGridReady: function (params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.sizeColumnsToFit();
      },
      onGridSizeChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
      onComponentStateChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
    }

    this.employeeService.getEmployee().subscribe((res: any) => {
      this.rowData = res;
    })
  }

  onCellValueChanged(params) {
    this.gridEdited = true;
    var node;
    node = params.node;
    if (this.gridOptions.api.getValue("7", node) != "New") {
      node.setDataValue("7", "true");
    }
  }

  onSelectionChanged(event) {
    if (this.gridOptions.api.getSelectedRows().length == 1) {
      this.selection = true;
    } else {
      this.selection = false;
    }
  }

  onDeleteRow() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    var selectedNodes = this.gridOptions.api.getSelectedNodes();
    for(let row of selectedRows) {

      // Delete
      this.employeeService.deleteEmployee(selectedRows[0].id).subscribe(res => {
        this.gridOptions.api.applyTransaction({ remove: selectedRows });
      }, err => {
        window.alert("Hubo un error al borrar el registro")
      });
    }
  }

  onSaveChanges() {
    var row;
    var modifiedRows: Array<number> = [];
    for (let i = 0; i < this.gridOptions.api.getDisplayedRowCount(); i++) {
      row = this.gridOptions.api.getDisplayedRowAtIndex(i);
      if (this.gridOptions.api.getValue("7", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {

      //NEW
      this.employee = new Employee();

      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);

      //Set New Values
      this.employee.id = this.gridOptions.api.getValue("0", row2);
      this.employee.name = this.gridOptions.api.getValue("1", row2);
      this.employee.cardId = this.gridOptions.api.getValue("2", row2);
      this.employee.departmentId = this.gridOptions.api.getValue("3", row2);
      this.employee.job = this.gridOptions.api.getValue("4", row2);
      console.log(JSON.parse(JSON.stringify(this.employee)))

      // Call Service
      this.employeeService.updateEmployee(this.employee).subscribe(res => {
        window.alert("Se ha actualizado correctamente")
      })
    }
  }

  onCreateEmployee() {
    console.log(JSON.parse(JSON.stringify(this.employee)));
    this.employeeService.createEmployee(this.employee).subscribe(res => {
      window.alert("Se ha insertado Correctamente")
    })
  }

}
