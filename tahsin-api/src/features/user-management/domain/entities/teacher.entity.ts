import { ClassEntity } from '../../../course-management/domain/entities/class.entity';
import { UserEntity } from './user.entity';

export class TeacherEntity {
  id: number;
  user_id: number;
  status: 'ONLINE' | 'OFFLINE' | 'HYBRID';

  classes: ClassEntity[];
  user: UserEntity;

  constructor(data: Partial<TeacherEntity>) {
    Object.assign(this, data);
  }
}
