import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { BANK_ACCOUNT_REPO_TOKEN } from 'src/core/const/provider.token';
import { BankAccountRepository } from 'src/features/master-data/domain/repository/bank-account.repository';

@Injectable()
export class DeleteBankAccountUseCase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeleteBankAccountUseCase.name);

  constructor(
    @Inject(BANK_ACCOUNT_REPO_TOKEN)
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Checking bank account existence`);
    const existenceBankAccount =
      await this.bankAccountRepository.findById(input);

    if (!existenceBankAccount) {
      this.logger.warn(`bank account not found`);
      throw new NotFoundException('Bank account not found');
    }

    this.logger.debug('Deleting bank account');
    const result = await this.bankAccountRepository.delete(input);

    this.logger.log('Successfully deleting bank account');
    return result;
  }
}
