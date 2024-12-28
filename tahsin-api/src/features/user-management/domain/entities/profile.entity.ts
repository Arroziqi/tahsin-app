import { UserEntity } from './user.entity';

export class ProfileEntity {
  id: number;
  name: string;
  place_of_birth?: string;
  date_of_birth?: Date;
  address?: string;
  domicile?: string;
  phone_number?: string;
  profession?: string;
  user_id: number;
  user: UserEntity;

  constructor(data: Partial<ProfileEntity>) {
    Object.assign(this, data);
  }
}
