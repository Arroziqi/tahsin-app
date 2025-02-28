import { StudentEntity } from '../entities/student.entity';
import { DataState } from '../../../../core/resources/data.state';

export interface StudentRepository {
  create(student: StudentEntity): Promise<DataState<StudentEntity>>;
  update(student: StudentEntity): Promise<DataState<StudentEntity>>;
  delete(id: number): Promise<DataState<string>>;
  findById(id: number): Promise<DataState<StudentEntity>>;
  findAll(): Promise<DataState<StudentEntity[]>>;
  findByRegistrationId(
    registrationId: number,
  ): Promise<DataState<StudentEntity>>;
  findByUserId(userId: number): Promise<DataState<StudentEntity>>;
}
