import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionTypeComponent } from './components/deduction-type/deduction-type.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { IncomeTypeComponent } from './components/income-type/income-type.component';
import { LogoComponent } from './components/logo/logo.component';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  { path: "employee", component: EmployeeComponent},
  { path: "deduction-type", component: DeductionTypeComponent},
  { path: "department", component: DepartmentComponent},
  { path: "income-type", component: IncomeTypeComponent},
  { path: "logo", component: LogoComponent},
  { path: "transaction", component: TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
