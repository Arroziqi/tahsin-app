import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { AcademicTermPaymentFeeEntity } from '../../entities/academicTerm-paymentFee.entity';
import { ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicTermPaymentFeeRepository } from '../../repositories/academicTerm-paymentFee.repository';

@Injectable()
export class GetAllAcademicTermPaymentFeeUsecase
  implements UseCase<void, DataState<AcademicTermPaymentFeeEntity[]>>
{
  private readonly logger = new Logger(
    GetAllAcademicTermPaymentFeeUsecase.name,
  );
  constructor(
    @Inject(ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN)
    private readonly academicTermPaymentFeeRepository: AcademicTermPaymentFeeRepository,
  ) {}

  async execute(): Promise<DataState<AcademicTermPaymentFeeEntity[]>> {
    this.logger.debug('Getting all academic term payment fees');
    const result: DataState<AcademicTermPaymentFeeEntity[]> =
      await this.academicTermPaymentFeeRepository.findAll();

    this.logger.log('Successfully retrieved all academic term payment fees');
    return result;
  }
}
