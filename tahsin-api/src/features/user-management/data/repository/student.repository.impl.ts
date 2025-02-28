import { Inject, Injectable } from '@nestjs/common';
import { StudentRepository } from '../../domain/repository/student.repository';
import { DataState } from 'src/core/resources/data.state';
import { StudentEntity } from '../../domain/entities/student.entity';
import { STUDENT_REPO_TOKEN } from '../../../../core/const/provider.token';

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
  constructor(
    @Inject(STUDENT_REPO_TOKEN)
    private readonly studentRepository: StudentRepository,
  ) {}
  async create(student: StudentEntity): Promise<DataState<StudentEntity>> {
    return await this.studentRepository.create(student);
  }
  async update(student: StudentEntity): Promise<DataState<StudentEntity>> {
    return await this.studentRepository.update(student);
  }
  async delete(id: number): Promise<DataState<string>> {
    return await this.studentRepository.delete(id);
  }
  async findById(id: number): Promise<DataState<StudentEntity>> {
    return await this.studentRepository.findById(id);
  }
  async findAll(): Promise<DataState<StudentEntity[]>> {
    return await this.studentRepository.findAll();
  }
  async findByRegistrationId(
    registrationId: number,
  ): Promise<DataState<StudentEntity>> {
    return await this.studentRepository.findByRegistrationId(registrationId);
  }
  async findByUserId(userId: number): Promise<DataState<StudentEntity>> {
    return await this.studentRepository.findByUserId(userId);
  }
}
