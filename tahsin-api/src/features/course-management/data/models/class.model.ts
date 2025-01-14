import { UserModel } from '../../../user-management/data/models/user.model';
import { LevelModel } from '../../../master-data/data/models/level.model';

export class ClassModel {
  id: number;
  name: string;
  teacher_id: number;
  level_id: number;

  Teacher?: UserModel;
  Level?: LevelModel;

  constructor(data: Partial<ClassModel>) {
    Object.assign(this, data);
  }
}
