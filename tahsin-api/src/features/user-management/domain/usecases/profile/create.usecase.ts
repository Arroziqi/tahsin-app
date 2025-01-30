import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { ProfileEntity } from '../../entities/profile.entity';
import { ProfileRepository } from '../../repository/profile.repository';
import {
  PROFILE_REPO_TOKEN,
  USER_REPO_TOKEN,
} from 'src/core/const/provider.token';
import { UserRepository } from '../../repository/user.repository';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';

@Injectable()
export class CreateProfileUsecase
  implements UseCase<ProfileEntity, DataState<ProfileEntity>>
{
  private readonly logger = new Logger(CreateProfileUsecase.name);

  constructor(
    @Inject(PROFILE_REPO_TOKEN)
    private readonly profileRepository: ProfileRepository,
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  async execute(input: ProfileEntity): Promise<DataState<ProfileEntity>> {
    await this.userService.checkExistingUserWithId(input.user_id);

    await this.profileService.checkDuplicateProfileWithUserId(input.user_id);

    this.logger.debug(`Creating profile for user id: ${input.user_id}`);
    const result = await this.profileRepository.create(input);

    this.logger.debug(
      `Successfully created profile for user id: ${input.user_id}`,
    );
    return result;
  }
}
