import { DataState } from '../../../../core/resources/data.state';
import { ClassEntity } from '../entities/class.entity';

export interface ClassRepository {
  findAll(): Promise<DataState<ClassEntity[]>>;
  findById(id: number): Promise<DataState<ClassEntity>>;
  findByUserId(user_id: number): Promise<DataState<ClassEntity[]>>;
  findByLevelId(level_id: number): Promise<DataState<ClassEntity[]>>;
  findByName(name: string): Promise<DataState<ClassEntity>>;
  create(data: ClassEntity): Promise<DataState<ClassEntity>>;
  update(data: ClassEntity): Promise<DataState<ClassEntity>>;
  delete(id: number): Promise<DataState<string>>;
}
