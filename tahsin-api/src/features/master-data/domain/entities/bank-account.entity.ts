export class BankAccountEntity {
  id: number;
  accountName: string;
  accountNumber: number;
  bankName: string;
  is_active: boolean;

  constructor(data: Partial<BankAccountEntity>) {
    Object.assign(this, data);
  }
}
