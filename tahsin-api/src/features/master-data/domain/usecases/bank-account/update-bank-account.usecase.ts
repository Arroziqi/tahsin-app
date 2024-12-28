import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { BankAccountEntity } from 'src/features/master-data/domain/entities/bank-account.entity';
import { DataState } from 'src/core/resources/data.state';
import { BANK_ACCOUNT_REPO_TOKEN } from 'src/core/const/provider.token';
import { BankAccountRepository } from 'src/features/master-data/domain/repository/bank-account.repository';

@Injectable()
export class UpdateBankAccountUsecase
  implements UseCase<BankAccountEntity, DataState<BankAccountEntity>>
{
  private readonly logger = new Logger(UpdateBankAccountUsecase.name);

  constructor(
    @Inject(BANK_ACCOUNT_REPO_TOKEN)
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async execute(
    input: BankAccountEntity,
  ): Promise<DataState<BankAccountEntity>> {
    this.logger.debug(`Checking bank account existence`);
    const existenceBankAccount: DataState<BankAccountEntity> =
      await this.bankAccountRepository.findById(input.id);

    if (!existenceBankAccount.data) {
      this.logger.debug(`Bank account not found`);
      throw new NotFoundException('bank account not found');
    }

    this.logger.debug(`updating bank account`);
    const result: DataState<BankAccountEntity> =
      await this.bankAccountRepository.update(input);

    this.logger.log('Successfully updated bank account');
    return result;
  }
}
