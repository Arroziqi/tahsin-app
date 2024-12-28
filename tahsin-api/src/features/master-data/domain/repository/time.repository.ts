import { DataState } from 'src/core/resources/data.state';
import { TimeEntity } from 'src/features/master-data/domain/entities/time.entity';
import { SessionNameEnum } from 'src/core/types/enum/session-name.enum';

export interface TimeRepository {
  findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>>;

  findBySessionName(
    session_name: SessionNameEnum,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>>;

  findByStartTime(
    start_time: number,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>>;

  findOverlappingTime(
    time: TimeEntity,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>>;

  findAll(includeSchedule?: boolean): Promise<DataState<TimeEntity[]>>;

  create(time: TimeEntity): Promise<DataState<TimeEntity>>;

  update(time: TimeEntity): Promise<DataState<TimeEntity>>;

  delete(id: number): Promise<DataState<string>>;
}
