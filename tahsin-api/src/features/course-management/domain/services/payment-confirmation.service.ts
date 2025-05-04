import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../repositories/payment-confirmation.repository';
import { PaymentConfirmationEntity } from '../entities/payment-confirmation.entity';
import { DataState } from 'src/core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';

@Injectable()
export class PaymentConfirmationService {
  private readonly logger = new Logger(PaymentConfirmationService.name);
  constructor(
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
  ) {}
  async checkDuplicatePaymentConfirmation(
    transaction_number: string,
  ): Promise<void> {
    this.logger.debug(`Checking for duplicate payment confirmations...`);
    const existingPaymentConfirmation =
      await this.paymentConfirmationRepository.findByTransactionNumber(
        transaction_number,
      );

    if (existingPaymentConfirmation.data) {
      this.logger.warn(
        `Payment confirmation already exists for this transaction...`,
      );
      throw new ConflictException(
        'Payment confirmation already exists for this transaction.',
      );
    }
  }

  async checkExistingPaymentConfirmation(id: number): Promise<void> {
    this.logger.debug(`Checking for existing payment confirmations...`);
    const existingPaymentConfirmation =
      await this.paymentConfirmationRepository.findById(id);

    if (!existingPaymentConfirmation.data) {
      this.logger.warn(`Payment confirmation not found...`);
      throw new ConflictException('Payment confirmation not found.');
    }
  }

  async getPaymentConfirmation(
    id: number,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    await this.checkExistingPaymentConfirmation(id);
    return await this.paymentConfirmationRepository.findById(id);
  }

  calculateUpdatedRemainingAmount(
    amount: number,
    outstandingAmount: number,
  ): number {
    if (amount > outstandingAmount) {
      this.logger.warn('amount payment is more than remaining payment');
      throw new ErrorEntity(
        400,
        `amount payment is more than remaining payment`,
        'Bad Request',
      );
    }

    return outstandingAmount - amount;
  }
}
