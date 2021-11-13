import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

<<<<<<< HEAD
  baseUrl = "https://localhost:44359/api/employee"
=======
  baseUrl = "https://localhost:44359/api/Employees"
>>>>>>> ac596029430a595b947b1b50bfd13badbb5b582c
  constructor(private httpClient: HttpClient) { }

  getEmployee() {
    return this.httpClient.get(this.baseUrl)
  }

  createEmployee(employee: Employee) {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(employee)), {responseType: "text"})
  }

  updateEmployee(employee: Employee) {
    return this.httpClient.put(this.baseUrl, JSON.parse(JSON.stringify(employee)), {responseType: "text"})
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id, {responseType: "text"})
  }
}
