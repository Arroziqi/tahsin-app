import { Inject } from '@nestjs/common';
import { CourseFeeRepository } from '../../domain/repository/course-fee.repository';
import { COURSE_FEE_REPO_TOKEN } from 'src/core/const/provider.token';
import { DataState } from 'src/core/resources/data.state';
import { CourseFeeEntity } from '../../domain/entities/course-fee.entity';

export class CourseFeeRepositoryImpl implements CourseFeeRepository {
  constructor(
    @Inject(COURSE_FEE_REPO_TOKEN)
    private readonly courseFeeRepository: CourseFeeRepository,
  ) {}
  async findById(
    id: number,
    includeClass?: boolean,
  ): Promise<DataState<CourseFeeEntity>> {
    return await this.courseFeeRepository.findById(id, includeClass);
  }
  async findAll(includeClass?: boolean): Promise<DataState<CourseFeeEntity[]>> {
    return await this.courseFeeRepository.findAll(includeClass);
  }
  async create(
    courseFee: CourseFeeEntity,
  ): Promise<DataState<CourseFeeEntity>> {
    return await this.courseFeeRepository.create(courseFee);
  }
  async update(
    courseFee: CourseFeeEntity,
  ): Promise<DataState<CourseFeeEntity>> {
    return await this.courseFeeRepository.update(courseFee);
  }
  async delete(id: number): Promise<DataState<string>> {
    return await this.courseFeeRepository.delete(id);
  }
}
