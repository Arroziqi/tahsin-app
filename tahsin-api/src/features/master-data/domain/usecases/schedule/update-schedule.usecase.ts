import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { SCHEDULE_REPO_TOKEN } from 'src/core/const/provider.token';
import { ScheduleEntity } from '../../entities/schedule.entity';
import { ScheduleRepository } from '../../repository/schedule.repository';
import { ScheduleService } from '../../services/schedule.service';

@Injectable()
export class UpdateScheduleUsecase
  implements UseCase<ScheduleEntity, DataState<ScheduleEntity>>
{
  private readonly logger = new Logger(UpdateScheduleUsecase.name);

  constructor(
    @Inject(SCHEDULE_REPO_TOKEN)
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleService: ScheduleService,
  ) {}

  async execute(input: ScheduleEntity): Promise<DataState<ScheduleEntity>> {
    await this.scheduleService.checkExistingSchedule(input.id);

    this.logger.debug(`Updating schedule with id: ${input.id}`);
    const result = await this.scheduleRepository.update(input);

    this.logger.log(`Successfully updated schedule with id: ${input.id}`);
    return result;
  }
}
