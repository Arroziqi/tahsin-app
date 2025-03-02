import { StudentStatusEnum } from '../../../../core/types/enum/student-status.enum';
import { UserModel } from './user.model';
import { RegistrationModel } from '../../../course-management/data/models/registration.model';
import { LevelModel } from '../../../master-data/data/models/level.model';

export class StudentModel {
  id: number;
  registration_id: number;
  level_id?: number;
  status: StudentStatusEnum;
  user_id: number;
  admin_id?: number;

  Level?: LevelModel;
  Registration?: RegistrationModel;
  User?: UserModel;
  constructor(data: Partial<StudentModel>) {
    Object.assign(this, data);
  }
}
