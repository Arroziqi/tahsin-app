import { Inject, Injectable, Logger } from '@nestjs/common';
import { LevelEntity } from '../../entities/level.entity';
import { LEVEL_REPO_TOKEN } from 'src/core/const/provider.token';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { LevelRepository } from '../../repository/level.repository';

@Injectable()
export class GetAllLevelUsecase
  implements UseCase<void, DataState<LevelEntity[]>>
{
  private readonly logger = new Logger(GetAllLevelUsecase.name);

  constructor(
    @Inject(LEVEL_REPO_TOKEN) private readonly levelRepository: LevelRepository,
  ) {}

  async execute(): Promise<DataState<LevelEntity[]>> {
    this.logger.debug('Getting all levels');
    const result = await this.levelRepository.findAll(true);

    this.logger.log('Successfully retrieved all levels');
    return result;
  }
}
