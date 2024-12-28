import { Inject, Injectable, Logger } from '@nestjs/common';
import { TimeEntity } from '../../entities/time.entity';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from '../../repository/time.repository';
import { DataState } from 'src/core/resources/data.state';
import { UseCase } from 'src/core/domain/usecases/usecase';

@Injectable()
export class GetAllTimeUsecase
  implements UseCase<void, DataState<TimeEntity[]>>
{
  private readonly logger = new Logger(GetAllTimeUsecase.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
  ) {}

  async execute(): Promise<DataState<TimeEntity[]>> {
    this.logger.debug('Getting all times');
    const result = await this.timeRepository.findAll(true);

    this.logger.log('Successfully retrieved all times');
    return result;
  }
}
