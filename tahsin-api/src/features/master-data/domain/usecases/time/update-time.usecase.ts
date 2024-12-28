import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { TimeEntity } from '../../entities/time.entity';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from '../../repository/time.repository';
import { TimeService } from 'src/features/master-data/domain/services/time.service';

@Injectable()
export class UpdateTimeUsecase
  implements UseCase<TimeEntity, DataState<TimeEntity>>
{
  private readonly logger = new Logger(UpdateTimeUsecase.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
    private readonly timeService: TimeService,
  ) {}

  async execute(input: TimeEntity): Promise<DataState<TimeEntity>> {
    await this.timeService.checkExistingTime(input.id);

    this.timeService.checkDurationTime(input.start_time, input.end_time);

    await this.timeService.checkOverlappingTime(input);

    this.logger.debug(`Updating time with id: ${input.id}`);
    const result = await this.timeRepository.update(input);

    this.logger.log(`Successfully updated time with id: ${input.id}`);
    return result;
  }
}
