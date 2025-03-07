import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN } from '../../../../core/const/provider.token';
import { AcademicTermPaymentFeeRepository } from '../repositories/academicTerm-paymentFee.repository';
import { AcademicTermPaymentFeeEntity } from '../entities/academicTerm-paymentFee.entity';
import { DataFailed, DataState } from 'src/core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';

@Injectable()
export class AcademicTermPaymentFeeService {
  private readonly logger = new Logger(AcademicTermPaymentFeeService.name);
  constructor(
    @Inject(ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN)
    private readonly academicTermPaymentFeeRepository: AcademicTermPaymentFeeRepository,
  ) {}

  async checkDuplicatePaymentFee(academic_term_id: number): Promise<void> {
    this.logger.debug(`Checking for duplicate academic term payment fees...`);
    const existingPaymentFee =
      await this.academicTermPaymentFeeRepository.findByAcademicTermId(
        academic_term_id,
      );

    if (existingPaymentFee.data) {
      this.logger.warn(`Academic term payment fee already exists...`);
      throw new ConflictException('Academic term payment fee already exists.');
    }
  }

  async checkExistingPaymentFee(id: number): Promise<void> {
    this.logger.debug(`Checking for existing academic term payment fees...`);
    const existingPaymentFee =
      await this.academicTermPaymentFeeRepository.findById(id);

    if (!existingPaymentFee.data) {
      this.logger.warn(`Academic term payment fee not found...`);
      throw new ConflictException('Academic term payment fee not found.');
    }
  }

  async getPaymentFee(
    id: number,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    await this.checkExistingPaymentFee(id);
    return await this.academicTermPaymentFeeRepository.findById(id);
  }

  async getTuitionFeeByAcademicTermId(
    id: number,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    const tuitionFee: DataState<AcademicTermPaymentFeeEntity> =
      await this.academicTermPaymentFeeRepository.findTuitionFeeByAcademicTermId(
        id,
      );

    if (!tuitionFee.data) {
      return new DataFailed(new ErrorEntity(404, `tuition fee not found.`));
    }

    return tuitionFee;
  }
}
