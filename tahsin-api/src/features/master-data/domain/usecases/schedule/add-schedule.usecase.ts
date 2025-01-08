import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { SCHEDULE_REPO_TOKEN } from 'src/core/const/provider.token';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { ScheduleEntity } from '../../entities/schedule.entity';
import { ScheduleRepository } from '../../repository/schedule.repository';
import { ScheduleService } from '../../services/schedule.service';

@Injectable()
export class AddScheduleUsecase
  implements UseCase<ScheduleEntity, DataState<ScheduleEntity>>
{
  private readonly logger = new Logger(AddScheduleUsecase.name);

  constructor(
    @Inject(SCHEDULE_REPO_TOKEN)
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleService: ScheduleService,
  ) {}

  async execute(input: ScheduleEntity): Promise<DataState<ScheduleEntity>> {
    this.logger.debug(`Creating schedule`);

    await this.scheduleService.checkDuplicateSchedule(input);

    this.logger.debug(`Creating new schedule`);
    const result = await this.scheduleRepository.create(input);

    this.logger.log(`New schedule successfully created`);
    return result;
  }
}
