import { DataState } from '../../../../core/resources/data.state';
import { AcademicTermPaymentFeeEntity } from '../entities/academicTerm-paymentFee.entity';

export interface AcademicTermPaymentFeeRepository {
  findAll(): Promise<DataState<AcademicTermPaymentFeeEntity[]>>;
  findById(id: number): Promise<DataState<AcademicTermPaymentFeeEntity>>;
  findByAcademicTermId(
    academicTermId: number,
  ): Promise<DataState<AcademicTermPaymentFeeEntity[]>>;
  create(
    paymentFee: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>>;
  update(
    paymentFee: AcademicTermPaymentFeeEntity,
  ): Promise<DataState<AcademicTermPaymentFeeEntity>>;
  delete(id: number): Promise<DataState<string>>;
}
