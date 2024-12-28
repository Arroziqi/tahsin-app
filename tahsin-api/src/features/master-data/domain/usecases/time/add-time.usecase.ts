import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { TimeEntity } from '../../entities/time.entity';
import { DataState } from 'src/core/resources/data.state';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from '../../repository/time.repository';
import { TimeService } from 'src/features/master-data/domain/services/time.service';

@Injectable()
export class AddTimeUsecase
  implements UseCase<TimeEntity, DataState<TimeEntity>>
{
  private readonly logger = new Logger(AddTimeUsecase.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
    private readonly timeService: TimeService,
  ) {}

  async execute(input: TimeEntity): Promise<DataState<TimeEntity>> {
    this.timeService.checkDurationTime(input.start_time, input.end_time);

    await this.timeService.checkOverlappingTime(input);

    const result = await this.timeRepository.create(input);
    this.logger.log(`New time created`);

    return result;
  }
}
