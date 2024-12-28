import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { EventEntity } from '../../entities/event.entity';
import { EVENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { EventRepository } from '../../repository/event.repository';

@Injectable()
export class GetAllEventUsecase
  implements UseCase<void, DataState<EventEntity[]>>
{
  private readonly logger = new Logger(GetAllEventUsecase.name);

  constructor(
    @Inject(EVENT_REPO_TOKEN) private readonly eventRepository: EventRepository,
  ) {}

  async execute(): Promise<DataState<EventEntity[]>> {
    this.logger.debug('Getting all events');
    const result = await this.eventRepository.findAll(true);

    this.logger.log('Successfully retrieved all events');
    return result;
  }
}
