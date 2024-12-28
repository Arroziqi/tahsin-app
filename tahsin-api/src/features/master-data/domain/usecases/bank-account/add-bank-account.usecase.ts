import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { BankAccountEntity } from 'src/features/master-data/domain/entities/bank-account.entity';
import { DataState } from 'src/core/resources/data.state';
import { BANK_ACCOUNT_REPO_TOKEN } from 'src/core/const/provider.token';
import { BankAccountRepository } from 'src/features/master-data/domain/repository/bank-account.repository';

@Injectable()
export class AddBankAccountUseCase
  implements UseCase<BankAccountEntity, DataState<BankAccountEntity>>
{
  private readonly logger: Logger = new Logger(AddBankAccountUseCase.name);

  constructor(
    @Inject(BANK_ACCOUNT_REPO_TOKEN)
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async execute(
    input: BankAccountEntity,
  ): Promise<DataState<BankAccountEntity>> {
    this.logger.debug('checking bank account existence');
    const existenceBankAccount = await this.bankAccountRepository.findByName(
      input.accountName,
    );

    if (existenceBankAccount.data && existenceBankAccount.data.id) {
      this.logger.warn('bank account already exists');
      throw new ConflictException('bank account already exists');
    }

    this.logger.debug('creating bank account');
    const result = await this.bankAccountRepository.create(input);

    this.logger.log('successfully created bank account');
    return result;
  }
}
