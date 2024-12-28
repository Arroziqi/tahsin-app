import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { ProfileEntity } from '../../entities/profile.entity';
import { ProfileRepository } from '../../repository/profile.repository';
import {
  PROFILE_REPO_TOKEN,
  USER_REPO_TOKEN,
} from 'src/core/const/provider.token';
import { UserRepository } from '../../repository/user.repository';

@Injectable()
export class CreateProfileUsecase
  implements UseCase<ProfileEntity, DataState<ProfileEntity>>
{
  private readonly logger = new Logger(CreateProfileUsecase.name);

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
      throw new NotFoundException('User with given ID does not exist');
    }

    this.logger.debug(
      `Checking if profile exists for user id: ${input.user_id}`,
    );
    const existingProfile = await this.profileRepository.findByUserId(
      input.user_id,
    );

    if (existingProfile.data) {
      this.logger.warn(`Profile already exists for user id ${input.user_id}`);
      throw new ConflictException('User already has a profile');
    }

    this.logger.debug(`Creating profile for user id: ${input.user_id}`);
    const result = await this.profileRepository.create(input);

    this.logger.debug(
      `Successfully created profile for user id: ${input.user_id}`,
    );
    return result;
  }
}
