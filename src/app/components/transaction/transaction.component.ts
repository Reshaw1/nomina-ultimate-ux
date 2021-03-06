import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DeductionType } from 'src/app/models/deductionType';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { IncomeType } from 'src/app/models/incomeType';
import { Transaction } from 'src/app/models/transaction';
import { DeductionTypeService } from '../deduction-type/deduction-type.service';
import { EmployeeService } from '../employee/employee.service';
import { IncomeTypeService } from '../income-type/income-type.service';
import { EmployeeSelectComponent } from '../selects/employee-select/employee-select.component';
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


  public DateFilterParams = {
    filterOptions: ['equals', 'inRange', 'greaterThanOrEqual', 'lessThanOrEqual'],
    defaultOption: 'inRange',
    inRangeInclusive: true,
    suppressAndOrCondition: true,
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var datepipe= new DatePipe('en_US');
      var dateAsString = datepipe.transform(cellValue, 'dd-MM-yyyy');
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('-');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );

      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }

      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }

      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }

      return 1
    },
    browserDatePicker: true,
    minValidYear: 2000,
  };

  colDef : ColDef[] = [
    { field: 'id', colId: "0", headerName: 'ID', hide: true},
    { field: 'employee', colId: '10', cellRenderer: "employeeSelect"},
    { field: 'employeeID', colId: "1", headerName: 'idEmpleado', hide: true},
    { field: 'null', colId: "2", headerName: 'Tipo Transaccion', editable : false,
      valueFormatter: (params) => {
        if(params.data.incomeType) {
          return  params.data.incomeType.name
        } else {
          return params.data.deductionType.name
        }}
      },
    // { field: 'deductionType.name', colId: "3", headerName: 'Tipo Deduccion', editable : false},
    { field: 'date', colId: "4", headerName: 'Fecha', filter: 'agDateColumnFilter', filterParams: this.DateFilterParams,
      valueFormatter: (params) => {var datepipe= new DatePipe('en_US');
      var date = datepipe.transform(params.value, 'dd-MM-yyyy')
      return date}},
    { field: 'ammount', colId: '5', headerName: 'Monto', editable: false },
    { field: 'status', colId: '5', headerName: 'Estado', editable: false},
    { field: 'select', colId: "6", headerName: 'Seleccionar', checkboxSelection: true, editable: false},
    { field: 'state', colId: "7", headerName: 'state', hide: true},
    { field: 'deductionType.id', colId: '8', hide: true},
    { field: 'incomeType.id', colId:'9', hide: true},
  ]

  defaultColDef = {
    // make every column editable
    editable: true,
    resizeable: true,
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

    this.frameworkComponents = {
      employeeSelect : EmployeeSelectComponent
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
      this.transactionService.deleteTransaction(selectedRows[0].id).subscribe(res => {
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
      this.transaction.id = this.gridOptions.api.getValue("0", row2);
      this.transaction.employeeId = this.gridOptions.api.getValue("0", row2);
      this.transaction.incomeTypeId = this.gridOptions.api.getValue("9", row2);
      this.transaction.deductionTypeId = this.gridOptions.api.getValue("8", row2);
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
        this.transactionService.getTransaction().subscribe((res: any) => {
          this.rowData = res;
        });
        if(notContabilizedTrans.length == 1) {
          window.alert("Se han contabilizado una factura correctamente")
        } else {
          window.alert("Se han contabilizado " + notContabilizedTrans.length + " facturas correctamente")
        }

      })
    } else {
      window.alert("No se encontraron facturas por Contabilizar!")
    }
  }
}
