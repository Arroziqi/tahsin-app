import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { LevelEntity } from '../../entities/level.entity';
import { LEVEL_REPO_TOKEN } from 'src/core/const/provider.token';
import { DataState } from 'src/core/resources/data.state';
import { LevelRepository } from '../../repository/level.repository';

@Injectable()
export class UpdateLevelUsecase
  implements UseCase<LevelEntity, DataState<LevelEntity>>
{
  private readonly logger = new Logger(UpdateLevelUsecase.name);

  constructor(
    @Inject(LEVEL_REPO_TOKEN) private readonly levelRepository: LevelRepository,
  ) {}

  async execute(input: LevelEntity): Promise<DataState<LevelEntity>> {
    this.logger.debug(`Updating level with id: ${input.id}`);

    const result = await this.levelRepository.update(input);

    this.logger.log(`Successfully updated level with id: ${input.id}`);
    return result;
  }
}
