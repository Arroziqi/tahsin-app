import { AdminStatusEnum } from '../../../../core/types/enum/admin-status.enum';
import { UserEntity } from './user.entity';

export class AdminEntity {
  id: number;
  user_id: number;
  status: AdminStatusEnum;

  User?: UserEntity;

  constructor(data: Partial<AdminEntity>) {
    Object.assign(this, data);
  }
}
