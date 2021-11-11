import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl = "http://localhost:44359/api/employee"
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
