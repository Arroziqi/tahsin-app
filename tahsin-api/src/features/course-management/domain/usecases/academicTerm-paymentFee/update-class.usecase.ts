import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { AcademicTermPaymentFeeEntity } from '../../entities/academicTerm-paymentFee.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermPaymentFeeRepository } from '../../repositories/academicTerm-paymentFee.repository';
import { AcademicTermPaymentFeeService } from '../../services/academicTerm-paymentFee.service';

@Injectable()
export class UpdateAcademicTermPaymentFeeUsecase
  implements
    UseCase<
      AcademicTermPaymentFeeEntity,
      DataState<AcademicTermPaymentFeeEntity>
    >
{
  private readonly logger = new Logger(
    UpdateAcademicTermPaymentFeeUsecase.name,
  );
  constructor(
    @Inject(ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN)
    private readonly academicTermPaymentFeeRepository: AcademicTermPaymentFeeRepository,
    private readonly academicTermPaymentFeeService: AcademicTermPaymentFeeService,
  ) {}

  async execute(
    input: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    const existingPaymentFee =
      await this.academicTermPaymentFeeService.getPaymentFee(input.id);

    const data: AcademicTermPaymentFeeEntity = {
      ...input,
      created_at: existingPaymentFee.data.created_at,
    };

    this.logger.debug('Updating academic term payment fee');
    const result = await this.academicTermPaymentFeeRepository.update(data);

    this.logger.log('Successfully updated academic term payment fee');
    return result;
  }
}
