import { TransformToDate } from 'src/common/decorators/transform-to-date.decorator';
import { UserModel } from './user.model';

export class ProfileModel {
  id: number;
  name: string;
  place_of_birth: string;
  @TransformToDate()
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
  user?: UserModel;

  constructor(data: Partial<ProfileModel>) {
    Object.assign(this, data);
  }
}
