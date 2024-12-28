import { DataState } from 'src/core/resources/data.state';
import { ProfileEntity } from '../../domain/entities/profile.entity';
import { ProfileRepository } from '../../domain/repository/profile.repository';
import { Inject, Injectable } from '@nestjs/common';
import { PROFILE_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(
    @Inject(PROFILE_REPO_TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}

  create(profile: ProfileEntity): Promise<DataState<ProfileEntity>> {
    return this.profileRepository.create(profile);
  }

  findById(
    id: number,
    includeUser?: boolean,
  ): Promise<DataState<ProfileEntity>> {
    return this.profileRepository.findById(id, includeUser);
  }

  findByUserId(
    userId: number,
    includeUser?: boolean,
  ): Promise<DataState<ProfileEntity>> {
    return this.profileRepository.findByUserId(userId, includeUser);
  }

  findAll(includeUser?: boolean): Promise<DataState<ProfileEntity[]>> {
    return this.profileRepository.findAll(includeUser);
  }

  update(profile: ProfileEntity): Promise<DataState<ProfileEntity>> {
    return this.profileRepository.update(profile);
  }
}
