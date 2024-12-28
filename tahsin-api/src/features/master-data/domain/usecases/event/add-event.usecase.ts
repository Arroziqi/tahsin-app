import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { EventEntity } from '../../entities/event.entity';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { EVENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { EventRepository } from '../../repository/event.repository';

@Injectable()
export class AddEventUsecase
  implements UseCase<EventEntity, DataState<EventEntity>>
{
  private readonly logger = new Logger(AddEventUsecase.name);

  constructor(
    @Inject(EVENT_REPO_TOKEN) private readonly eventRepository: EventRepository,
  ) {}

  async execute(input: EventEntity): Promise<DataState<EventEntity>> {
    this.logger.debug(`Checking event name existence: ${input.name}`);

    const existingEvent = await this.eventRepository.findByName(
      input.name,
      true,
    );

    if (existingEvent.data && existingEvent.data.id) {
      this.logger.warn(`Event already exists`);
      throw new ConflictException('Event already exists');
    }

    const result = await this.eventRepository.create(input);
    this.logger.log(`New event created with name: ${input.name}`);

    return result;
  }
}
