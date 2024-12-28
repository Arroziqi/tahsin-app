export class BankAccountModel {
  id: number;
  accountName: string;
  accountNumber: number;
  bankName: string;
  is_active: boolean;

  constructor(data: Partial<BankAccountModel>) {
    Object.assign(this, data);
  }
}
