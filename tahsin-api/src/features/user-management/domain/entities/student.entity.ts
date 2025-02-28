import { StudentStatusEnum } from '../../../../core/types/enum/student-status.enum';
import { UserEntity } from './user.entity';
import { RegistrationEntity } from '../../../course-management/domain/entities/registration.entity';

export class StudentEntity {
  id: number;
  user_id: number;
  registration_id: number;
  status: StudentStatusEnum;
  admin_id?: number;

  Registration?: RegistrationEntity;
  User?: UserEntity;
  constructor(data: Partial<StudentEntity>) {
    Object.assign(this, data);
  }
}
