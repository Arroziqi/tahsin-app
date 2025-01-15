import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { PaymentConfirmationEntity } from '../../entities/payment-confirmation.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../../repositories/payment-confirmation.repository';
import { PaymentConfirmationService } from '../../services/payment-confirmation.service';

@Injectable()
export class UpdatePaymentConfirmationUsecase
  implements
    UseCase<PaymentConfirmationEntity, DataState<PaymentConfirmationEntity>>
{
  private readonly logger = new Logger(UpdatePaymentConfirmationUsecase.name);
  constructor(
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
    private readonly paymentConfirmationService: PaymentConfirmationService,
  ) {}

  async execute(
    input: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    const existingPaymentConfirmation =
      await this.paymentConfirmationService.getPaymentConfirmation(input.id);

    const data: PaymentConfirmationEntity = {
      ...input,
      created_at: existingPaymentConfirmation.data.created_at,
    };

    this.logger.debug('Updating payment confirmation');
    const result = await this.paymentConfirmationRepository.update(data);

    this.logger.log('Successfully updated payment confirmation');
    return result;
  }
}
