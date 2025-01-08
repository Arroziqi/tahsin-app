import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { SCHEDULE_REPO_TOKEN } from 'src/core/const/provider.token';
import { ScheduleEntity } from '../../entities/schedule.entity';
import { ScheduleRepository } from '../../repository/schedule.repository';

@Injectable()
export class GetAllScheduleUsecase
  implements UseCase<void, DataState<ScheduleEntity[]>>
{
  private readonly logger = new Logger(GetAllScheduleUsecase.name);

  constructor(
    @Inject(SCHEDULE_REPO_TOKEN)
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async execute(): Promise<DataState<ScheduleEntity[]>> {
    this.logger.debug('Getting all schedules');
    const result = await this.scheduleRepository.findAll();

    this.logger.log('Successfully retrieved all schedules');
    return result;
  }
}
