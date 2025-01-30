import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { ProfileEntity } from '../../entities/profile.entity';
import { DataState } from '../../../../../core/resources/data.state';
import { PROFILE_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { ProfileRepository } from '../../repository/profile.repository';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';

@Injectable()
export class CreateManyProfileUsecase
  implements UseCase<ProfileEntity[], DataState<ProfileEntity[]>>
{
  private readonly logger = new Logger(CreateManyProfileUsecase.name);
  constructor(
    @Inject(PROFILE_REPO_TOKEN)
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}
  async execute(input: ProfileEntity[]): Promise<DataState<ProfileEntity[]>> {
    try {
      await Promise.all(
        input.map(async (profile: ProfileEntity) => {
          await this.userService.checkExistingUserWithId(profile.user_id);
          await this.profileService.checkDuplicateProfileWithUserId(
            profile.user_id,
          );
        }),
      );
    } catch (error) {
      this.logger.error(`Error checking profiles: ${error.message}`);
      throw new BadRequestException(
        `Error checking profiles: ${error.message}`,
      );
    }

    this.logger.debug(`Creating profiles`);
    let result: DataState<ProfileEntity[]>;
    try {
      result = await this.profileRepository.createMany(input);
    } catch (error) {
      this.logger.error('Error creating profiles', error);
      throw new BadRequestException('Error creating profiles');
    }

    this.logger.debug(`Successfully created profiles`);
    return result;
  }
}
