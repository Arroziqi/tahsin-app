import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { ProfileEntity } from '../../entities/profile.entity';
import { ProfileRepository } from '../../repository/profile.repository';
import { PROFILE_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class GetAllProfileUsecase
  implements UseCase<void, DataState<ProfileEntity[]>>
{
  private readonly logger = new Logger(GetAllProfileUsecase.name);

  constructor(
    @Inject(PROFILE_REPO_TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}
  async execute(): Promise<DataState<ProfileEntity[]>> {
    this.logger.debug('Getting all profiles');
    const result = await this.profileRepository.findAll();

    this.logger.debug(
      `Successfully retrieved ${result.data?.length || 0} profiles`,
    );
    return result;
  }
}
