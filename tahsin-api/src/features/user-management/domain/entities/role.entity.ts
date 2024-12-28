import { UserEntity } from '../../../user-management/domain/entities/user.entity';

export class RoleEntity {
  id: number;
  name: string;
  users?: UserEntity[];

  constructor(data: Partial<RoleEntity>) {
    Object.assign(this, data);
  }
}
