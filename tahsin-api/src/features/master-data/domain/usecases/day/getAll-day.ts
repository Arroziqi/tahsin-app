import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { DayEntity } from '../../entities/day.entity';
import { DayRepository } from '../../repository/day.repository';
import { DAY_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class GetAllDayUsecase implements UseCase<void, DataState<DayEntity[]>> {
  private readonly logger = new Logger(GetAllDayUsecase.name);

  constructor(
    @Inject(DAY_REPO_TOKEN) private readonly dayRepository: DayRepository,
  ) {}

  async execute(): Promise<DataState<DayEntity[]>> {
    this.logger.debug('Getting all days');
    const result = await this.dayRepository.findAll(true);

    this.logger.log('Successfully retrieved all days');
    return result;
  }
}
