import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { PaymentConfirmationEntity } from '../../entities/payment-confirmation.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { PaymentConfirmationService } from '../../services/payment-confirmation.service';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../../repositories/payment-confirmation.repository';

@Injectable()
export class AddPaymentConfirmationUsecase
  implements
    UseCase<PaymentConfirmationEntity, DataState<PaymentConfirmationEntity>>
{
  private readonly logger = new Logger(AddPaymentConfirmationUsecase.name);
  constructor(
    private readonly paymentConfirmationService: PaymentConfirmationService,
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
  ) {}

  async execute(
    input: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    await this.paymentConfirmationService.checkDuplicatePaymentConfirmation(
      input.transaction_number,
    );

    this.logger.debug('Creating payment confirmation');
    const result = await this.paymentConfirmationRepository.create(input);

    this.logger.log(`New payment confirmation created`);
    return result;
  }
}
