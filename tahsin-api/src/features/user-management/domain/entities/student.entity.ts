import { StudentStatusEnum } from '../../../../core/types/enum/student-status.enum';
import { UserEntity } from './user.entity';

export class StudentEntity {
  id: number;
  user_id: number;
  status: StudentStatusEnum;
  admin_id?: number;

  User?: UserEntity;
  constructor(data: Partial<StudentEntity>) {
    Object.assign(this, data);
  }
}
