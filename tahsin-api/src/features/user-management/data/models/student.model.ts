import { StudentStatusEnum } from '../../../../core/types/enum/student-status.enum';
import { UserModel } from './user.model';
import { RegistrationModel } from '../../../course-management/data/models/registration.model';

export class StudentModel {
  id: number;
  user_id: number;
  registration_id: number;
  status: StudentStatusEnum;
  admin_id?: number;

  Registration?: RegistrationModel;
  User?: UserModel;
  constructor(data: Partial<StudentModel>) {
    Object.assign(this, data);
  }
}
