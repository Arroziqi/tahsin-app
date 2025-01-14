import { UserEntity } from '../../../user-management/domain/entities/user.entity';
import { LevelEntity } from '../../../master-data/domain/entities/level.entity';

export class ClassEntity {
  id: number;
  name: string;
  teacher_id: number;
  level_id: number;

  Teacher?: UserEntity;
  Level?: LevelEntity;

  constructor(data: Partial<ClassEntity>) {
    Object.assign(this, data);
  }
}
