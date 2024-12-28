import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { LevelRepository } from '../../repository/level.repository';
import { LEVEL_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class DeleteLevelUsecase implements UseCase<number, DataState<string>> {
  private readonly logger = new Logger(DeleteLevelUsecase.name);

  constructor(
    @Inject(LEVEL_REPO_TOKEN) private readonly levelRepository: LevelRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Deleting level with id: ${input}`);
    const result = await this.levelRepository.delete(input);

    this.logger.log(`Successfully deleted level with id: ${input}`);
    return result;
  }
}
