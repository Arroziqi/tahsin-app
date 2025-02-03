import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { PaymentConfirmationEntity } from '../../entities/payment-confirmation.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { PaymentConfirmationService } from '../../services/payment-confirmation.service';
import { PAYMENT_CONFIRMATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { PaymentConfirmationRepository } from '../../repositories/payment-confirmation.repository';
import { UserService } from '../../../../user-management/domain/services/user.service';

@Injectable()
export class AddManyPaymentConfirmationUsecase
  implements
    UseCase<PaymentConfirmationEntity[], DataState<PaymentConfirmationEntity[]>>
{
  private readonly logger = new Logger(AddManyPaymentConfirmationUsecase.name);
  constructor(
    private readonly paymentConfirmationService: PaymentConfirmationService,
    @Inject(PAYMENT_CONFIRMATION_REPO_TOKEN)
    private readonly paymentConfirmationRepository: PaymentConfirmationRepository,
    private readonly userService: UserService,
  ) {}

  async execute(
    input: PaymentConfirmationEntity[],
  ): Promise<DataState<PaymentConfirmationEntity[]>> {
    try {
      await Promise.all(
        input.map(async (paymentConfirmation: PaymentConfirmationEntity) => {
          await this.userService.checkExistingUserWithId(
            paymentConfirmation.student_id,
          );
        }),
      );
    } catch (error) {
      this.logger.error(
        `error checking paymentConfirmations: ${error.message}`,
      );
      throw new BadRequestException(error);
    }

    this.logger.debug('Creating paymentConfirmations');
    let result: DataState<PaymentConfirmationEntity[]>;
    try {
      result = await this.paymentConfirmationRepository.createMany(input);
    } catch (error) {
      this.logger.error(
        'Error creating paymentConfirmationss',
        error.statusCode,
        error.message,
      );
      throw new BadRequestException(error);
    }

    this.logger.log(`New payment confirmations created`);
    return result;
  }
}
