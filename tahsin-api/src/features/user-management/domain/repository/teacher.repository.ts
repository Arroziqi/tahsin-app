import { DataState } from 'src/core/resources/data.state';
import { TeacherEntity } from '../entities/teacher.entity';

export interface TeacherRepository {
  create(teacher: TeacherEntity): Promise<DataState<TeacherEntity>>;

  findById(id: number): Promise<DataState<TeacherEntity>>;

  findByUserId(userId: number): Promise<DataState<TeacherEntity>>;

  findAll(): Promise<DataState<TeacherEntity[]>>;

  update(teacher: TeacherEntity): Promise<DataState<TeacherEntity>>;
}
