import { DataState } from 'src/core/resources/data.state';
import { ProfileEntity } from '../entities/profile.entity';

export interface ProfileRepository {
  create(profile: ProfileEntity): Promise<DataState<ProfileEntity>>;

  findById(
    id: number,
    includeUser?: boolean,
  ): Promise<DataState<ProfileEntity>>;

  findByUserId(
    userId: number,
    includeUser?: boolean,
  ): Promise<DataState<ProfileEntity>>;

  findAll(includeUser?: boolean): Promise<DataState<ProfileEntity[]>>;

  update(profile: ProfileEntity): Promise<DataState<ProfileEntity>>;
}
