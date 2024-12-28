import { ProfileEntity } from './profile.entity';
import { RoleEntity } from './role.entity';

// import { RegistrationEntity } from "./registration.entities";

export class UserEntity {
  id: number;
  email: string;
  password: string;
  username: string;
  hashedRefreshToken?: string;
  role_id: number;
  // Relations
  // registrations?: RegistrationEntity[];
  profile?: ProfileEntity;
  role?: RoleEntity;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
