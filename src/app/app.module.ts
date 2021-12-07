import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LogoComponent } from './components/logo/logo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//AG Grid
import { AgGridModule } from 'ag-grid-angular';

import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DeductionTypeComponent } from './components/deduction-type/deduction-type.component';
import { IncomeTypeComponent } from './components/income-type/income-type.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentSelectComponent } from './components/selects/department-select/department-select.component';
import { EmployeeSelectComponent } from './components/selects/employee-select/employee-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    TransactionComponent,
    DeductionTypeComponent,
    IncomeTypeComponent,
    DepartmentComponent,
    LogoComponent,
    DepartmentSelectComponent,
    EmployeeSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
