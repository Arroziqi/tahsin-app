import { Injectable } from '@nestjs/common';
import { StudentEntity } from '../../../domain/entities/student.entity';
import { DataState } from '../../../../../core/resources/data.state';

export interface StudentPrismaDatasources {
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

// TODO: Implement the method

@Injectable()
export class StudentPrismaDatasourcesImpl implements StudentPrismaDatasources {
  async create(student: StudentEntity): Promise<DataState<StudentEntity>> {
    throw new Error('Method not implemented.');
  }
  async update(student: StudentEntity): Promise<DataState<StudentEntity>> {
    throw new Error('Method not implemented.');
  }
  async delete(id: number): Promise<DataState<string>> {
    throw new Error('Method not implemented.');
  }
  async findById(id: number): Promise<DataState<StudentEntity>> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<DataState<StudentEntity[]>> {
    throw new Error('Method not implemented.');
  }
  async findByRegistrationId(
    registrationId: number,
  ): Promise<DataState<StudentEntity>> {
    throw new Error('Method not implemented.');
  }
  async findByUserId(userId: number): Promise<DataState<StudentEntity>> {
    throw new Error('Method not implemented.');
  }
}
