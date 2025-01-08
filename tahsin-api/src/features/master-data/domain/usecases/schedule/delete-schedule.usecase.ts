import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { SCHEDULE_REPO_TOKEN } from 'src/core/const/provider.token';
import { ScheduleRepository } from '../../repository/schedule.repository';
import { ScheduleService } from '../../services/schedule.service';

@Injectable()
export class DeleteScheduleUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeleteScheduleUsecase.name);

  constructor(
    @Inject(SCHEDULE_REPO_TOKEN)
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleService: ScheduleService,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    await this.scheduleService.checkExistingSchedule(input);

    this.logger.debug(`Deleting schedule with id: ${input}`);
    const result = await this.scheduleRepository.delete(input);

    this.logger.log(`Successfully deleted schedule with id: ${input}`);
    return result;
  }
}
