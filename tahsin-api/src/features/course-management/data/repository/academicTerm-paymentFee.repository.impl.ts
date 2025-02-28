import { Inject, Injectable, Logger } from '@nestjs/common';
import { AcademicTermPaymentFeeRepository } from '../../domain/repositories/academicTerm-paymentFee.repository';
import { DataState } from 'src/core/resources/data.state';
import { AcademicTermPaymentFeeEntity } from '../../domain/entities/academicTerm-paymentFee.entity';
import { ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN } from '../../../../core/const/provider.token';

@Injectable()
export class AcademicTermPaymentFeeRepositoryImpl
  implements AcademicTermPaymentFeeRepository
{
  private readonly logger = new Logger(
    AcademicTermPaymentFeeRepositoryImpl.name,
  );
  constructor(
    @Inject(ACADEMIC_TERM_PAYMENT_FEE_REPO_TOKEN)
    private readonly academicTermPaymentFeeRepository: AcademicTermPaymentFeeRepository,
  ) {}

  async findTuitionFeeByAcademicTermId(
    academicTermId: number,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    return await this.academicTermPaymentFeeRepository.findTuitionFeeByAcademicTermId(
      academicTermId,
    );
  }

  async findByAcademicTermId(
    academicTermId: number,
  ): Promise<DataState<AcademicTermPaymentFeeEntity[]>> {
    return await this.academicTermPaymentFeeRepository.findByAcademicTermId(
      academicTermId,
    );
  }

  async findAll(): Promise<DataState<AcademicTermPaymentFeeEntity[]>> {
    return await this.academicTermPaymentFeeRepository.findAll();
  }

  async findById(id: number): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    return await this.academicTermPaymentFeeRepository.findById(id);
  }

  async create(
    paymentFee: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    return await this.academicTermPaymentFeeRepository.create(paymentFee);
  }

  async update(
    paymentFee: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>> {
    return await this.academicTermPaymentFeeRepository.update(paymentFee);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.academicTermPaymentFeeRepository.delete(id);
  }
}
