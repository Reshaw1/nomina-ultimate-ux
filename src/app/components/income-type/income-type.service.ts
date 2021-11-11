import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { IncomeType } from 'src/app/models/incomeType';

@Injectable({
  providedIn: 'root'
})
export class IncomeTypeService {

  baseUrl = "http://localhost:44359/api/incomeType"
  constructor(private httpClient: HttpClient) { }

  getIncomeType() {
    return this.httpClient.get(this.baseUrl)
  }

  createIncomeType(incomeType: IncomeType) {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(incomeType)), {responseType: "text"})
  }

  updateIncomeType(incomeType: IncomeType) {
    return this.httpClient.put(this.baseUrl, JSON.parse(JSON.stringify(incomeType)), {responseType: "text"})
  }

  deleteIncomeType(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id, {responseType: "text"})
  }
}
