import { LevelModel } from '../../../master-data/data/models/level.model';
import { TeacherModel } from '../../../user-management/data/models/teacher.model';

export class ClassModel {
  id: number;
  name: string;
  teacher_id: number;
  level_id: number;

  Teacher?: TeacherModel;
  Level?: LevelModel;

  constructor(data: Partial<ClassModel>) {
    Object.assign(this, data);
  }
}
