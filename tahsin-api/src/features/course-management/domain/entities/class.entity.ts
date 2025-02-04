import { LevelEntity } from '../../../master-data/domain/entities/level.entity';
import { TeacherEntity } from '../../../user-management/domain/entities/teacher.entity';

export class ClassEntity {
  id: number;
  name: string;
  teacher_id: number;
  level_id: number;

  Teacher?: TeacherEntity;
  Level?: LevelEntity;

  constructor(data: Partial<ClassEntity>) {
    Object.assign(this, data);
  }
}
