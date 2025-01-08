import { TimeModel } from './time.model';
import { DayModel } from './day.model';
import { MeetingTypeEnum } from '../../../../core/types/enum/meeting-type.enum';

export class ScheduleModel {
  id: number;
  day_id: number;
  time_id: number;
  type: MeetingTypeEnum;

  Time?: TimeModel;
  Day?: DayModel;

  constructor(data: Partial<ScheduleModel>) {
    Object.assign(this, data);
  }
}
