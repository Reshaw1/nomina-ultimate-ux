import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = "http://localhost:44359/api/department"
  constructor(private httpClient: HttpClient) { }

  getDepartment() {
    return this.httpClient.get(this.baseUrl)
  }

  createDepartment(department: Department) {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(department)), {responseType: "text"})
  }

  updateDepartment(department: Department) {
    return this.httpClient.put(this.baseUrl, JSON.parse(JSON.stringify(department)), {responseType: "text"})
  }

  deleteDepartment(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id, {responseType: "text"})
  }
}
