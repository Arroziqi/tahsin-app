import { Inject, Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repository/bank-account.repository';
import { BANK_ACCOUNT_REPO_TOKEN } from 'src/core/const/provider.token';
import { DataState } from 'src/core/resources/data.state';
import { BankAccountEntity } from '../../domain/entities/bank-account.entity';

@Injectable()
export class BankAccountRepositoryImpl implements BankAccountRepository {
  constructor(
    @Inject(BANK_ACCOUNT_REPO_TOKEN)
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}
  async findById(id: number): Promise<DataState<BankAccountEntity>> {
    return await this.bankAccountRepository.findById(id);
  }
  async findByName(name: string): Promise<DataState<BankAccountEntity>> {
    return await this.bankAccountRepository.findByName(name);
  }
  async findAll(): Promise<DataState<BankAccountEntity[]>> {
    return await this.bankAccountRepository.findAll();
  }
  async create(
    bankAccount: BankAccountEntity,
  ): Promise<DataState<BankAccountEntity>> {
    return await this.bankAccountRepository.create(bankAccount);
  }
  async update(
    bankAccount: BankAccountEntity,
  ): Promise<DataState<BankAccountEntity>> {
    return await this.bankAccountRepository.update(bankAccount);
  }
  async delete(id: number): Promise<DataState<string>> {
    return await this.bankAccountRepository.delete(id);
  }
}
