import { StudentStatusEnum } from '../../../../core/types/enum/student-status.enum';
import { UserEntity } from './user.entity';
import { RegistrationEntity } from '../../../course-management/domain/entities/registration.entity';
import { LevelEntity } from '../../../master-data/domain/entities/level.entity';

export class StudentEntity {
  id: number;
  registration_id: number;
  level_id?: number;
  user_id: number;
  status: StudentStatusEnum;
  admin_id?: number;

  Level?: LevelEntity;
  Registration?: RegistrationEntity;
  User?: UserEntity;
  constructor(data: Partial<StudentEntity>) {
    Object.assign(this, data);
  }
}
