import { UserEntity } from './user.entity';

export class ProfileEntity {
  id: number;
  name: string;
  place_of_birth: string;
  date_of_birth: Date;
  address: string;
  domicile: string;
  phone_number: string;
  profession: string;
  previous_education: string;
  intended_program?: string;
  user_id: number;
  admin_id?: number;
  created_at: Date;
  updated_at: Date;
  user?: UserEntity;

  constructor(data: Partial<ProfileEntity>) {
    Object.assign(this, data);
  }
}
