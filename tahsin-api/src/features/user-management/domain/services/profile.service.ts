import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import {
  PROFILE_REPO_TOKEN,
  USER_REPO_TOKEN,
} from '../../../../core/const/provider.token';
import { UserRepository } from '../repository/user.repository';
import { ProfileRepository } from '../repository/profile.repository';
import { UserService } from './user.service';
import { ProfileEntity } from '../entities/profile.entity';
import { DataFailed, DataState } from '../../../../core/resources/data.state';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    @Inject(PROFILE_REPO_TOKEN)
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
  ) {}

  async checkDuplicateProfileWithUserId(userId: number): Promise<void> {
    this.logger.debug(`Checking if profile exists for user id: ${userId}`);
    const existingProfile = await this.profileRepository.findByUserId(userId);

    if (existingProfile.data) {
      this.logger.warn(`Profile already exists for user id ${userId}`);
      throw new ConflictException(
        `Profile already exists for user id ${userId}`,
      );
    }
  }

  async checkExistingProfileWithUserId(
    userId: number,
  ): Promise<DataState<ProfileEntity>> {
    this.logger.debug(`Checking if profile exists for user id: ${userId}`);
    const existingProfile = await this.profileRepository.findByUserId(userId);
    if (!existingProfile.data) {
      this.logger.warn(`Profile doesn't exists for user id: ${userId}`);
      return new DataFailed(
        new ErrorEntity(
          404,
          `Profile doesn't exists for user id: ${userId}`,
          `not found`,
        ),
      );
    }
    return existingProfile;
  }
}
