import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl = "https://nominaunapec.azurewebsites.net/api/transaction"
  constructor(private httpClient: HttpClient) { }

  getTransaction() {
    return this.httpClient.get(this.baseUrl)
  }

  createTransaction(transaction: Transaction) {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(transaction)), {responseType: "text"})
  }

  updateTransaction(transaction: Transaction) {
    return this.httpClient.put(this.baseUrl, JSON.parse(JSON.stringify(transaction)), {responseType: "text"})
  }

  deleteTransaction(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id, {responseType: "text"})
  }

  contabilizeTransactions(ids: number[]) {
    return this.httpClient.post(this.baseUrl.replace("transaction", "accountingEntry"), ids , {responseType: "text"})
  }
}
