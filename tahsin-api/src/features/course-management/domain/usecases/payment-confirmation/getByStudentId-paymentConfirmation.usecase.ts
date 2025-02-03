import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { PaymentConfirmationEntity } from '../../entities/payment-confirmation.entity';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../../repositories/payment-confirmation.repository';
import { UserService } from '../../../../user-management/domain/services/user.service';

@Injectable()
export class GetByStudentIdPaymentConfirmationUsecase
  implements UseCase<number, DataState<PaymentConfirmationEntity[]>>
{
  private readonly logger = new Logger(
    GetByStudentIdPaymentConfirmationUsecase.name,
  );
  constructor(
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
    private readonly userService: UserService,
  ) {}

  async execute(
    studentId: number,
  ): Promise<DataState<PaymentConfirmationEntity[]>> {
    await this.userService.checkExistingUserWithId(studentId);

    this.logger.debug('Getting payment confirmations');
    const result: DataState<PaymentConfirmationEntity[]> =
      await this.paymentConfirmationRepository.findByStudentId(studentId);

    this.logger.log('Successfully retrieved payment confirmations');
    return result;
  }
}
