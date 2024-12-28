import { DataState } from 'src/core/resources/data.state';
import { BankAccountEntity } from '../entities/bank-account.entity';

export interface BankAccountRepository {
  findById(id: number): Promise<DataState<BankAccountEntity>>;

  findByName(name: string): Promise<DataState<BankAccountEntity>>;

  findAll(): Promise<DataState<BankAccountEntity[]>>;

  create(bankAccount: BankAccountEntity): Promise<DataState<BankAccountEntity>>;

  update(bankAccount: BankAccountEntity): Promise<DataState<BankAccountEntity>>;

  delete(id: number): Promise<DataState<string>>;
}
