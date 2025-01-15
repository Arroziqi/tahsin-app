import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { PaymentConfirmationEntity } from '../../entities/payment-confirmation.entity';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../../repositories/payment-confirmation.repository';

@Injectable()
export class GetAllPaymentConfirmationUsecase
  implements UseCase<void, DataState<PaymentConfirmationEntity[]>>
{
  private readonly logger = new Logger(GetAllPaymentConfirmationUsecase.name);
  constructor(
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
  ) {}

  async execute(): Promise<DataState<PaymentConfirmationEntity[]>> {
    this.logger.debug('Getting all payment confirmations');
    const result: DataState<PaymentConfirmationEntity[]> =
      await this.paymentConfirmationRepository.findAll();

    this.logger.log('Successfully retrieved all payment confirmations');
    return result;
  }
}
