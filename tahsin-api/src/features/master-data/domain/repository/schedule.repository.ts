import { DataState } from '../../../../core/resources/data.state';
import { ScheduleEntity } from '../entities/schedule.entity';
import { MeetingTypeEnum } from '@prisma/client';

export interface ScheduleRepository {
  findById(id: number): Promise<DataState<ScheduleEntity>>;
  findByDayId(day_id: number): Promise<DataState<ScheduleEntity[]>>;
  findByTimeId(time_id: number): Promise<DataState<ScheduleEntity[]>>;
  findByType(type: MeetingTypeEnum): Promise<DataState<ScheduleEntity[]>>;
  findAll(): Promise<DataState<ScheduleEntity[]>>;
  create(schedule: ScheduleEntity): Promise<DataState<ScheduleEntity>>;
  update(schedule: ScheduleEntity): Promise<DataState<ScheduleEntity>>;
  delete(id: number): Promise<DataState<string>>;
}
