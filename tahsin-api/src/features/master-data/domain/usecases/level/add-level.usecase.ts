import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { LevelEntity } from '../../entities/level.entity';
import { LevelRepository } from '../../repository/level.repository';
import { DataFailed, DataState } from 'src/core/resources/data.state';
import { LEVEL_REPO_TOKEN } from 'src/core/const/provider.token';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

@Injectable()
export class AddLevelUsecase
  implements UseCase<LevelEntity, DataState<LevelEntity>>
{
  private readonly logger = new Logger(AddLevelUsecase.name);

  constructor(
    @Inject(LEVEL_REPO_TOKEN) private readonly levelRepository: LevelRepository,
  ) {}

  async execute(input: LevelEntity): Promise<DataState<LevelEntity>> {
    const existingLevel = await this.levelRepository.findByName(
      input.name,
      true,
    );

    this.logger.debug(
      `Checking level name existence: ${input.name}`,
      JSON.stringify(existingLevel, null, 2),
    );

    if (existingLevel.data && existingLevel.data.id) {
      this.logger.warn(
        `Create level attempt with existing name: ${input.name}`,
      );
      throw new DataFailed<LevelEntity>(
        new ErrorEntity(409, 'Level already exists'),
      );
    }

    const result = await this.levelRepository.create(input);
    this.logger.log(`New level created with name: ${input.name}`);

    return result;
  }
}
