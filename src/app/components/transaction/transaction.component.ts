import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DeductionType } from 'src/app/models/deductionType';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { IncomeType } from 'src/app/models/incomeType';
import { Transaction } from 'src/app/models/transaction';
import { DeductionTypeService } from '../deduction-type/deduction-type.service';
import { EmployeeService } from '../employee/employee.service';
import { IncomeTypeService } from '../income-type/income-type.service';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  employees: Employee[] = [];

  transactionType: string = "";

  // department: Department = new Department();
  // departments: Department[] = [];

  deductionTypes: DeductionType[] = [];

  incomeTypes: IncomeType[] = [];

  transaction: Transaction = new Transaction();

  gridEdited: boolean = false;
  selection: boolean = false;

  colDef : ColDef[] = [
    { field: 'id', colId: "0", headerName: 'ID', hide: true},
    { field: 'employeeId', colId: "1", headerName: 'idEmpleado', hide: true},
    { field: 'incomeTypeId', colId: "2", headerName: 'idIngreso', hide: true},
    { field: 'deductionTypeId', colId: "3", headerName: 'idDeduccion', hide: true},
    { field: 'date', colId: "4", headerName: 'Fecha', type: 'date'},
    { field: 'amount', colId: '5', headerName: 'Monto', editable: false },
    { field: 'status', colId: '5', headerName: 'Estado', editable: false},
    { field: 'select', colId: "6", headerName: 'Seleccionar', checkboxSelection: true, editable: false},
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

  frameworkComponents;

  gridOptions : GridOptions ;

  constructor(
    private transactionService: TransactionService,
    private employeeService: EmployeeService,
    private deductionTypeService: DeductionTypeService,
    private incomeTypeService: IncomeTypeService) { }

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

    this.transactionService.getTransaction().subscribe((res: any) => {
      this.rowData = res;
    });

    this.employeeService.getEmployee().subscribe((res: any) => {
      this.employees = res;
    })

    this.incomeTypeService.getIncomeType().subscribe((res: any) => {
      this.incomeTypes = res;
    })

    this.deductionTypeService.getDeductionType().subscribe((res: any) => {
      this.deductionTypes = res;
    });


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
      this.transactionService.deleteTransaction(selectedRows[0].ID).subscribe(res => {
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
      this.transaction = new Transaction();

      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);

      //Set New Values
      this.transaction.employeeId = this.gridOptions.api.getValue("0", row2);
      this.transaction.incomeTypeId = this.gridOptions.api.getValue("1", row2);
      this.transaction.deductionTypeId = this.gridOptions.api.getValue("2", row2);
      this.transaction.date = this.gridOptions.api.getValue("3", row2);
      this.transaction.amount = this.gridOptions.api.getValue("4", row2);
      this.transaction.status = this.gridOptions.api.getValue("5", row2);
      console.log(JSON.parse(JSON.stringify(this.transaction)))

      // Call Service
      this.transactionService.updateTransaction(this.transaction).subscribe(res => {
        window.alert("Se ha actualizado correctamente")
      })
    }
  }

  onCreateTransaction() {
    this.transaction.status = "No Contabilizado";
    if(this.transactionType == "Income") {
      this.transaction.deductionTypeId = undefined;
    } else {
      this.transaction.incomeTypeId = undefined;
    }
    console.log(JSON.parse(JSON.stringify(this.transaction)));
    this.transactionService.createTransaction(this.transaction).subscribe(res => {
      window.alert("Se ha insertado Correctamente");
      this.transactionService.getTransaction().subscribe((res: any) => {
        this.rowData = res;
      });
    })
  }

  onContabilizeTransactions() {
    var displayedRows = this.gridOptions.api.getRenderedNodes();

    var notContabilizedTrans: number[] = [];

    if(displayedRows.length > 0 || displayedRows.some((row) => {return row.data.status == "No Contabilizado"})) {
      displayedRows.forEach(row => {
        if(row.data.status == "No Contabilizado") {
          notContabilizedTrans.push(row.data.id);
        }
      })

      this.transactionService.contabilizeTransactions(notContabilizedTrans).subscribe((res: any) => {
        if(displayedRows.length == 1) {
          window.alert("Se han contabilizado una factura correctamente")
        } else {
          window.alert("Se han contabilizado " + displayedRows.length + " facturas correctamente")
        }
      })
    } else {
      window.alert("No se encontraron facturas por Contabilizar!")
    }
  }
}
