import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DayEntity } from '../../entities/day.entity';
import { DataState } from 'src/core/resources/data.state';
import { DayRepository } from '../../repository/day.repository';
import { DAY_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class UpdateDayUsecase
  implements UseCase<DayEntity, DataState<DayEntity>>
{
  private readonly logger = new Logger(UpdateDayUsecase.name);

  constructor(
    @Inject(DAY_REPO_TOKEN) private readonly dayRepository: DayRepository,
  ) {}

  async execute(input: DayEntity): Promise<DataState<DayEntity>> {
    this.logger.debug(`Checking if day with id ${input.id} exists`);
    const day = await this.dayRepository.findById(input.id);

    if (!day.data) {
      this.logger.error(`Day with id ${input.id} not found`);
      throw new NotFoundException(`Day with id ${input.id} not found`);
    }

    this.logger.debug(`Updating day with id: ${input.id}`);
    const result = await this.dayRepository.update(input);

    this.logger.log(`Successfully updated day with id: ${input.id}`);
    return result;
  }
}
