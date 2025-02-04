import { StudentStatusEnum } from '../../../../core/types/enum/student-status.enum';
import { UserModel } from './user.model';

export class StudentModel {
  id: number;
  user_id: number;
  status: StudentStatusEnum;
  admin_id?: number;

  User?: UserModel;
  constructor(data: Partial<StudentModel>) {
    Object.assign(this, data);
  }
}
