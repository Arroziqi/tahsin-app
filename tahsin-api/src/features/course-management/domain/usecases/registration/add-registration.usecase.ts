import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { RegistrationEntity } from '../../entities/registration.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { RegistrationService } from '../../services/registration.service';
import { REGISTRATION_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { RegistrationRepository } from '../../repositories/registration.repository';
import { AcademicTermPaymentFeeService } from '../../services/academicTerm-paymentFee.service';
import { AddPaymentConfirmationUsecase } from '../payment-confirmation/add-paymentConfirmation.usecase';
import { PaymentConfirmationEntity } from '../../entities/payment-confirmation.entity';

@Injectable()
export class AddRegistrationUsecase
  implements UseCase<RegistrationEntity, DataState<RegistrationEntity>>
{
  private readonly logger = new Logger(AddRegistrationUsecase.name);
  constructor(
    private readonly registrationService: RegistrationService,
    @Inject(REGISTRATION_REPO_TOKEN)
    private readonly registrationRepository: RegistrationRepository,
    private readonly academicTermPaymentFeeService: AcademicTermPaymentFeeService,
    private readonly addPaymentConfirmationUseCase: AddPaymentConfirmationUsecase,
  ) {}

  async execute(
    input: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>> {
    await this.registrationService.checkDuplicateRegistration(
      input.user_id,
      input.academicTerm_id,
    );

    this.logger.debug('Creating registration');
    const result = await this.registrationRepository.create(input);

    this.logger.debug('getting tuition fee');
    const tuitionFee =
      await this.academicTermPaymentFeeService.getTuitionFeeByAcademicTermId(
        input.academicTerm_id,
      );

    // TODO: - create student

    this.logger.debug('creating invoice');
    await this.addPaymentConfirmationUseCase.execute(
      new PaymentConfirmationEntity({
        amount: 0,
        academicTermPaymentFee_id: tuitionFee.data.id,
        outstanding_amount: tuitionFee.data.amount,
        transaction_date: new Date(),
        notes: 'tuition invoice',
        // student_id
      }),
    );

    this.logger.log(`new registration created`);
    return result;
  }
}
