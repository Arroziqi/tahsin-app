import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from '../../repository/time.repository';
import { TimeService } from 'src/features/master-data/domain/services/time.service';

@Injectable()
export class DeleteTimeUsecase implements UseCase<number, DataState<string>> {
  private readonly logger = new Logger(DeleteTimeUsecase.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
    private readonly timeService: TimeService,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    await this.timeService.checkExistingTime(input);

    this.logger.debug(`Deleting time with id: ${input}`);
    const result = await this.timeRepository.delete(input);

    this.logger.log(`Successfully deleted time with id: ${input}`);
    return result;
  }
}
