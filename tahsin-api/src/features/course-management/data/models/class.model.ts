import { UserModel } from '../../../user-management/data/models/user.model';
import { LevelModel } from '../../../master-data/data/models/level.model';

export class ClassModel {
  id: number;
  name: string;
  user_id: number;
  level_id: number;

  User?: UserModel;
  Level?: LevelModel;

  constructor(data: Partial<ClassModel>) {
    Object.assign(this, data);
  }
}
