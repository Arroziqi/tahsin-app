import { DataState } from '../../../../core/resources/data.state';
import { RegistrationEntity } from '../entities/registration.entity';

export interface RegistrationRepository {
  findAll(): Promise<DataState<RegistrationEntity[]>>;
  findById(id: number): Promise<DataState<RegistrationEntity>>;
  findByUserId(user_id: number): Promise<DataState<RegistrationEntity[]>>;
  findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<RegistrationEntity[]>>;
  create(
    registration: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>>;
  update(
    registration: RegistrationEntity,
  ): Promise<DataState<RegistrationEntity>>;
  delete(id: number): Promise<DataState<string>>;
}
