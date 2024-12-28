import { DataState } from 'src/core/resources/data.state';
import { CourseFeeEntity } from '../entities/course-fee.entity';

export interface CourseFeeRepository {
  findById(
    id: number,
    includeClass?: boolean,
  ): Promise<DataState<CourseFeeEntity>>;
  findAll(includeClass?: boolean): Promise<DataState<CourseFeeEntity[]>>;
  create(courseFee: CourseFeeEntity): Promise<DataState<CourseFeeEntity>>;
  update(courseFee: CourseFeeEntity): Promise<DataState<CourseFeeEntity>>;
  delete(id: number): Promise<DataState<string>>;
}
