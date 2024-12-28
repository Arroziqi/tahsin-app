import { Inject, Injectable, Logger, ConflictException } from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { DAY_REPO_TOKEN } from 'src/core/const/provider.token';
import { DayEntity } from '../../entities/day.entity';
import { DayRepository } from '../../repository/day.repository';
import { UseCase } from 'src/core/domain/usecases/usecase';

@Injectable()
export class AddDayUsecase implements UseCase<DayEntity, DataState<DayEntity>> {
  private readonly logger = new Logger(AddDayUsecase.name);

  constructor(
    @Inject(DAY_REPO_TOKEN) private readonly dayRepository: DayRepository,
  ) {}

  async execute(input: DayEntity): Promise<DataState<DayEntity>> {
    this.logger.debug(`Checking day name existence: ${input.name}`);

    const existingDay = await this.dayRepository.findByName(input.name, true);

    if (existingDay.data && existingDay.data.id) {
      this.logger.warn(`Day already exists`);
      throw new ConflictException('Day already exists');
    }

    this.logger.debug(`Creating new day: ${input.name}`);
    const result = await this.dayRepository.create(input);

    this.logger.log(`New day created with name: ${input.name}`);
    return result;
  }
}
