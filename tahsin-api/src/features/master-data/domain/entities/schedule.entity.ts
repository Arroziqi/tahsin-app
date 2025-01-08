import { MeetingTypeEnum } from '../../../../core/types/enum/meeting-type.enum';
import { TimeEntity } from './time.entity';
import { DayEntity } from './day.entity';

export class ScheduleEntity {
  id: number;
  day_id: number;
  time_id: number;
  type: MeetingTypeEnum;

  Time?: TimeEntity;
  Day?: DayEntity;

  constructor(data: Partial<ScheduleEntity>) {
    Object.assign(this, data);
  }
}
