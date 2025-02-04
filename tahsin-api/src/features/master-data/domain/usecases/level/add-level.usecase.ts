import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { LevelEntity } from '../../entities/level.entity';
import { LevelRepository } from '../../repository/level.repository';
import { DataState } from 'src/core/resources/data.state';
import { LEVEL_REPO_TOKEN } from 'src/core/const/provider.token';
import { LevelService } from '../../services/level.service';

@Injectable()
export class AddLevelUsecase
  implements UseCase<LevelEntity, DataState<LevelEntity>>
{
  private readonly logger = new Logger(AddLevelUsecase.name);

  constructor(
    @Inject(LEVEL_REPO_TOKEN) private readonly levelRepository: LevelRepository,
    private readonly levelService: LevelService,
  ) {}

  async execute(input: LevelEntity): Promise<DataState<LevelEntity>> {
    await this.levelService.checkDuplicateLevel(input.name);

    const result = await this.levelRepository.create(input);
    this.logger.log(`New level created with name: ${input.name}`);

    return result;
  }
}
