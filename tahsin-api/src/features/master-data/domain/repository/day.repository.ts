import { DataState } from 'src/core/resources/data.state';
import { DayEntity } from 'src/features/master-data/domain/entities/day.entity';
import { DaysEnum } from 'src/core/types/enum/days.enum';

export interface DayRepository {
  findAll(includeSchedule?: boolean): Promise<DataState<DayEntity[]>>;

  findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<DayEntity>>;

  findByName(
    name: DaysEnum,
    includeSchedule?: boolean,
  ): Promise<DataState<DayEntity>>;

  create(day: DayEntity): Promise<DataState<DayEntity>>;

  update(day: DayEntity): Promise<DataState<DayEntity>>;

  delete(id: number): Promise<DataState<string>>;
}
