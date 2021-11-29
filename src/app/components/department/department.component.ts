import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  gridEdited: boolean = false;
  selection: boolean = false;

  department: Department = new Department();

  colDef : ColDef[] = [
    { field: 'id', colId: "0", headerName: 'ID', hide: true},
    { field: 'departmentName', colId: "1", headerName: 'Nombre'},
    { field: 'select', colId: "2", headerName: 'Seleccionar', checkboxSelection: true},
    { field: 'state', colId: "3", headerName: 'state', hide: true}
  ]

  rowData : any = [
  ]

  defaultColDef = {
    // make every column editable
    editable: true,
    resizeable:false,
    suppressMovable:true,
    // make every column use 'text' filter by default
  }

  gridOptions : GridOptions ;

  constructor(private departmentService: DepartmentService) { }

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

    this.departmentService.getDepartment().subscribe((res: any)=>{
      this.rowData = res;
    });
  }

  onCellValueChanged(params) {
    this.gridEdited = true;
    var node;
    node = params.node;
    if (this.gridOptions.api.getValue("3", node) != "New") {
      node.setDataValue("3", "true");
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
      this.departmentService.deleteDepartment(selectedRows[0].id).subscribe(res => {
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
      if (this.gridOptions.api.getValue("3", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {

      //NEW
      this.department = new Department();

      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);

      //Set New Values
      this.department.id = this.gridOptions.api.getValue("0", row2);
      this.department.departmentName = this.gridOptions.api.getValue("1", row2);
      console.log(JSON.parse(JSON.stringify(this.department)))

      // Call Service
      this.departmentService.updateDepartment(this.department).subscribe(res => {
        window.alert("Se ha actualizado correctamente")
      })
    }
  }

  onCreateDepartment() {
    console.log(JSON.parse(JSON.stringify(this.department)));
    this.departmentService.createDepartment(this.department).subscribe(res => {
      window.alert("Se ha insertado Correctamente");
      this.departmentService.getDepartment().subscribe((res: any)=>{
        this.rowData = res;
      });
    })
  }
}
