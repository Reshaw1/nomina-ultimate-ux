import { Transaction } from "./transaction";

export class AccountingEntry {
  id: number;
  description: string;
  account: string;
  movementType: string;
  transaction: Transaction;
}
