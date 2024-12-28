import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../domain/repository/event.repository';
import { DataState } from 'src/core/resources/data.state';
import { EventEntity } from '../../domain/entities/event.entity';
import { EVENT_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class EventRepositoryImpl implements EventRepository {
  constructor(
    @Inject(EVENT_REPO_TOKEN) private readonly eventRepository: EventRepository,
  ) {}

  async findById(
    id: number,
    includeCalendar?: boolean,
  ): Promise<DataState<EventEntity>> {
    return await this.eventRepository.findById(id, includeCalendar);
  }

  async findByName(
    name: string,
    includeCalendar?: boolean,
  ): Promise<DataState<EventEntity>> {
    return await this.eventRepository.findByName(name, includeCalendar);
  }

  async findAll(includeCalendar?: boolean): Promise<DataState<EventEntity[]>> {
    return await this.eventRepository.findAll(includeCalendar);
  }

  async create(event: EventEntity): Promise<DataState<EventEntity>> {
    return await this.eventRepository.create(event);
  }

  async update(event: EventEntity): Promise<DataState<EventEntity>> {
    return await this.eventRepository.update(event);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.eventRepository.delete(id);
  }
}
