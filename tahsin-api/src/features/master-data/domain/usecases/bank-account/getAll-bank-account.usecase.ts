import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { BankAccountEntity } from 'src/features/master-data/domain/entities/bank-account.entity';
import { BANK_ACCOUNT_REPO_TOKEN } from 'src/core/const/provider.token';
import { BankAccountRepository } from 'src/features/master-data/domain/repository/bank-account.repository';

@Injectable()
export class GetAllBankAccountUsecase
  implements UseCase<void, DataState<BankAccountEntity[]>>
{
  private readonly logger = new Logger(GetAllBankAccountUsecase.name);

  constructor(
    @Inject(BANK_ACCOUNT_REPO_TOKEN)
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async execute(): Promise<DataState<BankAccountEntity[]>> {
    this.logger.debug('Getting all bank account account');
    const result: DataState<BankAccountEntity[]> =
      await this.bankAccountRepository.findAll();

    this.logger.debug('Successfully all bank account account');
    return result;
  }
}
