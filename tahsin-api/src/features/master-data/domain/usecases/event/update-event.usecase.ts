import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { EventEntity } from '../../entities/event.entity';
import { EVENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { EventRepository } from '../../repository/event.repository';

@Injectable()
export class UpdateEventUsecase
  implements UseCase<EventEntity, DataState<EventEntity>>
{
  private readonly logger = new Logger(UpdateEventUsecase.name);

  constructor(
    @Inject(EVENT_REPO_TOKEN) private readonly eventRepository: EventRepository,
  ) {}

  async execute(input: EventEntity): Promise<DataState<EventEntity>> {
    this.logger.debug(`Checking if event exists with id: ${input.id}`);
    const existingEvent = await this.eventRepository.findById(input.id, true);

    if (!existingEvent.data) {
      this.logger.warn(`Event with id: ${input.id} not found`);
      throw new NotFoundException('Event not found');
    }

    this.logger.debug(`Updating event with id: ${input.id}`);
    const result = await this.eventRepository.update(input);

    this.logger.log(`Successfully updated event with id: ${input.id}`);
    return result;
  }
}
