import { ClassEntity } from '../../../course-management/domain/entities/class.entity';
import { UserEntity } from '../../domain/entities/user.entity';

export class TeacherModel {
  id: number;
  user_id: number;
  status: 'ONLINE' | 'OFFLINE' | 'HYBRID';

  classes: ClassEntity[];
  user: UserEntity;

  constructor(data: Partial<TeacherModel>) {
    Object.assign(this, data);
  }
}
