import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataFailed, DataState } from 'src/core/resources/data.state';
import { ProfileEntity } from '../../entities/profile.entity';
import { ProfileRepository } from '../../repository/profile.repository';
import {
  PROFILE_REPO_TOKEN,
  USER_REPO_TOKEN,
} from 'src/core/const/provider.token';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { UserRepository } from '../../repository/user.repository';

@Injectable()
export class UpdateProfileUsecase
  implements UseCase<ProfileEntity, DataState<ProfileEntity>>
{
  private readonly logger = new Logger(UpdateProfileUsecase.name);

  constructor(
    @Inject(PROFILE_REPO_TOKEN)
    private readonly profileRepository: ProfileRepository,
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
  ) {}

  async execute(input: ProfileEntity): Promise<DataState<ProfileEntity>> {
    this.logger.debug(`Checking if user exists with id: ${input.user_id}`);
    const existingUser = await this.userRepository.findById(input.user_id);

    if (!existingUser.data) {
      this.logger.warn(`User with id ${input.user_id} not found`);
      return new DataFailed<ProfileEntity>(
        new ErrorEntity(
          404,
          'User not found',
          'User with given ID does not exist',
        ),
      );
    }

    this.logger.debug(
      `Checking if profile exists with user id: ${input.user_id}`,
    );
    const existingProfile = await this.profileRepository.findByUserId(
      input.user_id,
    );

    if (!existingProfile.data) {
      this.logger.warn(`Profile with user id ${input.user_id} not found`);
      return new DataFailed<ProfileEntity>(
        new ErrorEntity(
          404,
          'Profile not found',
          'Profile with given ID does not exist',
        ),
      );
    }

    this.logger.debug(`Updating profile for user id: ${input.user_id}`);
    const result = await this.profileRepository.update({
      ...input,
      id: existingProfile.data.id,
    });

    this.logger.debug(
      `Successfully updated profile for user id: ${input.user_id}`,
    );
    return result;
  }
}
