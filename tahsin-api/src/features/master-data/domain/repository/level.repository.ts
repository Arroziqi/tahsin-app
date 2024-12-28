import { DataState } from 'src/core/resources/data.state';
import { LevelEntity } from '../entities/level.entity';

export interface LevelRepository {
  findById(id: number, includeClass?: boolean): Promise<DataState<LevelEntity>>;

  findByName(
    name: string,
    includeClass?: boolean,
  ): Promise<DataState<LevelEntity>>;

  findAll(includeClass?: boolean): Promise<DataState<LevelEntity[]>>;

  create(level: LevelEntity): Promise<DataState<LevelEntity>>;

  update(level: LevelEntity): Promise<DataState<LevelEntity>>;

  delete(id: number): Promise<DataState<string>>;
}
