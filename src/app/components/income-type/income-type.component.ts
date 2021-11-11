import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { IncomeType } from 'src/app/models/incomeType';
import { IncomeTypeService } from './income-type.service';

@Component({
  selector: 'app-income-type',
  templateUrl: './income-type.component.html',
  styleUrls: ['./income-type.component.scss']
})
export class IncomeTypeComponent implements OnInit {

  incomeType: IncomeType = new IncomeType();

  colDef : ColDef[] = [
    { field: 'id', colId: "0", headerName: 'ID', hide: true},
    { field: 'name', colId: "1", headerName: 'Nombre'},
    { field: 'salaryPercentage', colId: "2", headerName: 'Porcentaje Salarial'},
    { field: 'status', colId: "3", headerName: 'Estado'},
    { field: 'select', colId: "4", headerName: 'Seleccionar', checkboxSelection: true},
    { field: 'state', colId: "5", headerName: 'state', hide: true}
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

  constructor(private incomeTypeService: IncomeTypeService) { }

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

    this.incomeTypeService.getIncomeType().subscribe((res: any) => {
      this.rowData = res;
    })
  }

  onDeleteRow() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    var selectedNodes = this.gridOptions.api.getSelectedNodes();
    for(let row of selectedRows) {

      // Delete
      this.incomeTypeService.deleteIncomeType(selectedRows[0].id).subscribe(res => {
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
      if (this.gridOptions.api.getValue("2", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {

      //NEW
      this.incomeType = new IncomeType();

      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);

      //Set New Values
      this.incomeType.id = this.gridOptions.api.getValue("0", row2);
      this.incomeType.name = this.gridOptions.api.getValue("1", row2);
      this.incomeType.salaryPercentage = this.gridOptions.api.getValue("2", row2);
      this.incomeType.status = this.gridOptions.api.getValue("3", row2);
      console.log(JSON.parse(JSON.stringify(this.incomeType)))

      // Call Service
      this.incomeTypeService.updateIncomeType(this.incomeType).subscribe(res => {
        window.alert("Se ha actualizado correctamente")
      })
    }
  }

  onCreateIncomeType(): void {
    this.incomeType.status = "Activo";
    console.log(JSON.parse(JSON.stringify(this.incomeType)));
    this.incomeTypeService.createIncomeType(this.incomeType).subscribe(res => {
      window.alert("Se ha insertado Correctamente")
    })
  }
}
