import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../../repositories/payment-confirmation.repository';
import { PaymentConfirmationService } from '../../services/payment-confirmation.service';

@Injectable()
export class DeletePaymentConfirmationUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeletePaymentConfirmationUsecase.name);
  constructor(
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
    private readonly paymentConfirmationService: PaymentConfirmationService,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    await this.paymentConfirmationService.checkExistingPaymentConfirmation(
      input,
    );

    this.logger.debug(`Deleting payment confirmation`);
    const result = await this.paymentConfirmationRepository.delete(input);

    this.logger.log('Successfully deleted payment confirmation');
    return result;
  }
}
