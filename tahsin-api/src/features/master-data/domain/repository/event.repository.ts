import { DataState } from 'src/core/resources/data.state';
import { EventEntity } from 'src/features/master-data/domain/entities/event.entity';

export interface EventRepository {
  findById(
    id: number,
    includeCalendar?: boolean,
  ): Promise<DataState<EventEntity>>;

  findByName(
    name: string,
    includeCalendar?: boolean,
  ): Promise<DataState<EventEntity>>;

  findAll(includeCalendar?: boolean): Promise<DataState<EventEntity[]>>;

  create(event: EventEntity): Promise<DataState<EventEntity>>;

  update(event: EventEntity): Promise<DataState<EventEntity>>;

  delete(id: number): Promise<DataState<string>>;
}
