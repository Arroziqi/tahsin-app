import { Inject, Injectable, Logger } from '@nestjs/common';
import { PaymentConfirmationRepository } from '../../domain/repositories/payment-confirmation.repository';
import { DataState } from 'src/core/resources/data.state';
import { PaymentConfirmationEntity } from '../../domain/entities/payment-confirmation.entity';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../core/const/provider.token';

@Injectable()
export class PaymentConfirmationRepositoryImpl
  implements PaymentConfirmationRepository
{
  private readonly logger = new Logger(PaymentConfirmationRepositoryImpl.name);
  constructor(
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
  ) {}

  async findAll(): Promise<DataState<PaymentConfirmationEntity[]>> {
    return await this.paymentConfirmationRepository.findAll();
  }

  async findById(id: number): Promise<DataState<PaymentConfirmationEntity>> {
    return await this.paymentConfirmationRepository.findById(id);
  }

  async findByTransactionNumber(
    transaction_number: string,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    return await this.paymentConfirmationRepository.findByTransactionNumber(
      transaction_number,
    );
  }

  async findByStudentId(
    student_id: number,
  ): Promise<DataState<PaymentConfirmationEntity[]>> {
    return await this.paymentConfirmationRepository.findByStudentId(student_id);
  }

  async create(
    paymentConfirmation: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    return await this.paymentConfirmationRepository.create(paymentConfirmation);
  }

  async update(
    paymentConfirmation: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    return await this.paymentConfirmationRepository.update(paymentConfirmation);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.paymentConfirmationRepository.delete(id);
  }
}
