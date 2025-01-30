import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import {
  PROFILE_REPO_TOKEN,
  USER_REPO_TOKEN,
} from '../../../../core/const/provider.token';
import { UserRepository } from '../repository/user.repository';
import { ProfileRepository } from '../repository/profile.repository';
import { UserService } from './user.service';

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
}
