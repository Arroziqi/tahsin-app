import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { AcademicTermPaymentFeeEntity } from '../../entities/academicTerm-paymentFee.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { AcademicTermPaymentFeeService } from '../../services/academicTerm-paymentFee.service';
import { ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermPaymentFeeRepository } from '../../repositories/academicTerm-paymentFee.repository';

@Injectable()
export class AddAcademicTermPaymentFeeUsecase
  implements
    UseCase<
      AcademicTermPaymentFeeEntity,
      DataState<AcademicTermPaymentFeeEntity>
    >
{
  private readonly logger = new Logger(AddAcademicTermPaymentFeeUsecase.name);
  constructor(
    private readonly academicTermPaymentFeeService: AcademicTermPaymentFeeService,
    @Inject(ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN)
    private readonly academicTermPaymentFeeRepository: AcademicTermPaymentFeeRepository,
  ) {}

  async execute(
    input: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    await this.academicTermPaymentFeeService.checkDuplicatePaymentFee(
      input.academicTerm_id,
    );

    this.logger.debug('Creating academic term payment fee');
    const result = await this.academicTermPaymentFeeRepository.create(input);

    this.logger.log(`New academic term payment fee created`);
    return result;
  }
}
