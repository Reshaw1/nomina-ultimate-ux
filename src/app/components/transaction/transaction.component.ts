import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  employee: Employee = new Employee();
  department: Department = new Department();

  departments: Department[] = [];

  colDef : ColDef[] = [
    { field: 'id', colId: "0", headerName: 'ID', hide: true},
    { field: 'name', colId: "1", headerName: 'Nombre'},
    { field: 'cardId', colId: "2", headerName: 'Cedula'},
    { field: 'department.departmentName', colId: "3", headerName: 'Departament'},
    { field: 'job', colId: "4", headerName: 'Puesto'},
    { field: 'salary', colId: '5', headerName: 'Salario'},
    { field: 'select', colId: "6", headerName: 'Seleccionar', checkboxSelection: true},
    { field: 'state', colId: "7", headerName: 'state'}
  ]

  rowData : any = [
  ]

  gridOptions : GridOptions ;

  constructor() { }

  ngOnInit(): void {
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
  }

  onDeleteRow() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    var selectedNodes = this.gridOptions.api.getSelectedNodes();
    for(let row of selectedRows) {

      // Delete
      // this.departmentService.deleteDepartment(selectedRows[0].ID).subscribe(res => {
      //   this.gridOptions.api.applyTransaction({ remove: selectedRows });
      // }, err => {
      //   window.alert("Hubo un error al borrar el registro")
      // });
    }
  }

  onSaveChanges() {
    var row;
    var modifiedRows: Array<number> = [];
    for (let i = 0; i < this.gridOptions.api.getDisplayedRowCount(); i++) {
      row = this.gridOptions.api.getDisplayedRowAtIndex(i);
      if (this.gridOptions.api.getValue("2", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {

      //NEW
      // this.department = new Department();

      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);

      //Set New Values
      // this.department.name = this.gridOptions.api.getValue("0", row2);
      // this.department.ID = this.gridOptions.api.getValue("3", row2);
      // console.log(JSON.parse(JSON.stringify(this.department)))

      // Call Service
      // this.departmentService.updateDepartment(this.department).subscribe(res => {
      //   window.alert("Se ha actualizado correctamente")
      // })
    }
  }
}
