import { DataState } from 'src/core/resources/data.state';
import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  findByUsername(
    username: string,
    includeRole?: boolean,
  ): Promise<DataState<UserEntity>>;

  findByEmail(
    email: string,
    includeRole?: boolean,
  ): Promise<DataState<UserEntity>>;

  findByEmails(emails: string[]): Promise<DataState<UserEntity[]>>;

  findById(id: number, includeRole?: boolean): Promise<DataState<UserEntity>>;

  create(user: UserEntity): Promise<DataState<UserEntity>>;

  createMany(users: UserEntity[]): Promise<DataState<UserEntity[]>>;

  updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ): Promise<DataState<string>>;

  updateRole(userId: number, role_id: number): Promise<DataState<UserEntity>>;

  update(user: UserEntity): Promise<DataState<UserEntity>>;

  delete(id: number): Promise<DataState<string>>;
}
