import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeductionType } from 'src/app/models/deductionType';

@Injectable({
  providedIn: 'root'
})
export class DeductionTypeService {

  baseUrl = "https://localhost:44359/api/deductiontype"
  constructor(private httpClient: HttpClient) { }

  getDeductionType() {
    return this.httpClient.get(this.baseUrl)
  }

  createDeductionType(deductionType: DeductionType) {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(deductionType)), {responseType: "text"})
  }

  updateDeductionType(deductionType: DeductionType) {
    return this.httpClient.put(this.baseUrl, JSON.parse(JSON.stringify(deductionType)), {responseType: "text"})
  }

  deleteDeductionType(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id, {responseType: "text"})
  }
}