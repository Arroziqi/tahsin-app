import { Inject, Injectable, Logger } from '@nestjs/common';
import { LEVEL_REPO_TOKEN } from '../../../../core/const/provider.token';
import { LevelRepository } from '../repository/level.repository';
import { ErrorEntity } from '../../../../core/domain/entities/error.entity';
import { DataFailed } from '../../../../core/resources/data.state';
import { LevelEntity } from '../entities/level.entity';

@Injectable()
export class LevelService {
  private readonly logger = new Logger(LevelService.name);
  constructor(
    @Inject(LEVEL_REPO_TOKEN) private readonly levelRepository: LevelRepository,
  ) {}

  async checkExistingLevelWithId(id: number): Promise<void> {
    this.logger.log(`Checking existing level with id ${id}`);
    const existingLevel = await this.levelRepository.findById(id);
    if (!existingLevel.data) {
      this.logger.warn(`No existing level with id ${id}`);
      throw new ErrorEntity(404, `Level with id ${id} not found`, `Not Found`);
    }
  }

  async checkDuplicateLevel(name: string): Promise<void> {
    const existingLevel = await this.levelRepository.findByName(name, true);

    this.logger.debug(
      `Checking level name existence: ${name}`,
      JSON.stringify(existingLevel, null, 2),
    );

    if (existingLevel.data && existingLevel.data.id) {
      this.logger.warn(`Duplicate level with existing name: ${name}`);
      throw new DataFailed<LevelEntity>(
        new ErrorEntity(409, 'Level already exists'),
      );
    }
  }
}
