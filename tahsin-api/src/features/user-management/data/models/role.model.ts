import { UserModel } from './user.model';

export class RoleModel {
  id: number;
  name: string;
  users?: UserModel[];

  constructor(data: Partial<RoleModel>) {
    Object.assign(this, data);
  }
}
