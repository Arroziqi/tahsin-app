import { AdminStatusEnum } from '../../../../core/types/enum/admin-status.enum';
import { UserModel } from './user.model';

export class AdminModel {
  id: number;
  user_id: number;
  status: AdminStatusEnum;

  User?: UserModel;

  constructor(data: Partial<AdminModel>) {
    Object.assign(this, data);
  }
}
