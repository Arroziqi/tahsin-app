import { TransformToDate } from 'src/common/decorators/transform-to-date.decorator';
import { UserModel } from './user.model';

export class ProfileModel {
  id: number;
  name: string;
  place_of_birth?: string;
  @TransformToDate()
  date_of_birth?: Date;
  address?: string;
  domicile?: string;
  phone_number?: string;
  profession?: string;
  user_id: number;
  user: UserModel;

  constructor(data: Partial<ProfileModel>) {
    Object.assign(this, data);
  }
}
