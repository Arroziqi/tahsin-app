import { DataState } from '../../../../core/resources/data.state';
import { PaymentConfirmationEntity } from '../entities/payment-confirmation.entity';

export interface PaymentConfirmationRepository {
  findAll(): Promise<DataState<PaymentConfirmationEntity[]>>;
  findById(id: number): Promise<DataState<PaymentConfirmationEntity>>;
  findByTransactionNumber(
    transaction_number: string,
  ): Promise<DataState<PaymentConfirmationEntity>>;
  findByStudentId(
    student_id: number,
  ): Promise<DataState<PaymentConfirmationEntity[]>>;
  create(
    paymentConfirmation: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>>;
  update(
    paymentConfirmation: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>>;
  delete(id: number): Promise<DataState<string>>;
}
