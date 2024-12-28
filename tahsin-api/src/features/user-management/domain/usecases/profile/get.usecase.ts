import { Inject, Injectable, Logger } from '@nestjs/common';
import { PROFILE_REPO_TOKEN } from 'src/core/const/provider.token';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { ProfileEntity } from '../../entities/profile.entity';
import { ProfileRepository } from '../../repository/profile.repository';

@Injectable()
export class GetProfileUsecase
  implements UseCase<number, DataState<ProfileEntity>>
{
  private readonly logger = new Logger(GetProfileUsecase.name);

  constructor(
    @Inject(PROFILE_REPO_TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(input: number): Promise<DataState<ProfileEntity>> {
    this.logger.debug(`Getting profile with user id: ${input}`);
    const result = await this.profileRepository.findByUserId(input);

    this.logger.debug(`Successfully retrieved profile with user id: ${input}`);
    return result;
  }
}
