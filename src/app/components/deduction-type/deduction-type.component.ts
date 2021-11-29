import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DeductionType } from 'src/app/models/deductionType';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DeductionTypeService } from './deduction-type.service';

@Component({
  selector: 'app-deduction-type',
  templateUrl: './deduction-type.component.html',
  styleUrls: ['./deduction-type.component.scss']
})
export class DeductionTypeComponent implements OnInit {

  gridEdited: boolean = false;
  selection: boolean = false;

  deductionType: DeductionType = new DeductionType();

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

  constructor(private deductionTypeService: DeductionTypeService) { }

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

    this.deductionTypeService.getDeductionType().subscribe((res: any) => {
      this.rowData = res;
    })
  }

  onCellValueChanged(params) {
    this.gridEdited = true;
    var node;
    node = params.node;
    if (this.gridOptions.api.getValue("5", node) != "New") {
      node.setDataValue("5", "true");
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


      this.deductionTypeService.deleteDeductionType(selectedRows[0].id).subscribe(res => {
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
      if (this.gridOptions.api.getValue("5", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {

      //NEW
      this.deductionType = new DeductionType();

      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);

      //Set New Values
      this.deductionType.id = this.gridOptions.api.getValue("0", row2);
      this.deductionType.name = this.gridOptions.api.getValue("1", row2);
      this.deductionType.salaryPercentage = this.gridOptions.api.getValue("2", row2);
      this.deductionType.status = this.gridOptions.api.getValue("3", row2);

      // Call Service
      this.deductionTypeService.updateDeductionType(this.deductionType).subscribe(res => {
        window.alert("Se ha actualizado correctamente")
      })
    }
  }

  onCreateDeductionType() {
    this.deductionType.status = "Activo";
    console.log(JSON.parse(JSON.stringify(this.deductionType)));
    this.deductionTypeService.createDeductionType(this.deductionType).subscribe(res => {
      window.alert("Se ha insertado Correctamente");

      this.deductionTypeService.getDeductionType().subscribe((res: any) => {
        this.rowData = res;
      })
    })
  }
}
