import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { PaymentConfirmationEntity } from '../../entities/payment-confirmation.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../../repositories/payment-confirmation.repository';
import { PaymentConfirmationService } from '../../services/payment-confirmation.service';
import { UpdateStudentUseCase } from '../../../../user-management/domain/usecases/student/updateStudent.usecase';
import { StudentEntity } from '../../../../user-management/domain/entities/student.entity';

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
    private readonly updateStudentUsecase: UpdateStudentUseCase,
  ) {}

  async execute(
    input: PaymentConfirmationEntity,
  ): Promise<DataState<PaymentConfirmationEntity>> {
    const existingPaymentConfirmation: DataState<PaymentConfirmationEntity> =
      await this.paymentConfirmationService.getPaymentConfirmation(input.id);

    let data: PaymentConfirmationEntity = {
      ...input,
      created_at: existingPaymentConfirmation.data.created_at,
    };

    if (input.status === 'VERIFIED') {
      const remainingAmount: number =
        existingPaymentConfirmation.data.outstanding_amount - input.amount;

      data = {
        ...data,
        outstanding_amount: remainingAmount,
      };

      await this.updateStudentUsecase.execute(
        new StudentEntity({ id: input.student_id, status: 'ACTIVE' }),
      );
    }

    this.logger.debug('Updating payment confirmation');
    const result: DataState<PaymentConfirmationEntity> =
      await this.paymentConfirmationRepository.update(data);

    this.logger.log('Successfully updated payment confirmation');
    return result;
  }
}
