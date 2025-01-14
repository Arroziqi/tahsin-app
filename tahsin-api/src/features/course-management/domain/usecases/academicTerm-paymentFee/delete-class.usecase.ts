import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermPaymentFeeRepository } from '../../repositories/academicTerm-paymentFee.repository';
import { AcademicTermPaymentFeeService } from '../../services/academicTerm-paymentFee.service';

@Injectable()
export class DeleteAcademicTermPaymentFeeUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(
    DeleteAcademicTermPaymentFeeUsecase.name,
  );
  constructor(
    @Inject(ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN)
    private readonly academicTermPaymentFeeRepository: AcademicTermPaymentFeeRepository,
    private readonly academicTermPaymentFeeService: AcademicTermPaymentFeeService,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    await this.academicTermPaymentFeeService.checkExistingPaymentFee(input);

    this.logger.debug(`Deleting academic term payment fee`);
    const result = await this.academicTermPaymentFeeRepository.delete(input);

    this.logger.log('Successfully deleted academic term payment fee');
    return result;
  }
}
