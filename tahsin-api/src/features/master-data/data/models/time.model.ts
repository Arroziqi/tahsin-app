import { SessionNameEnum } from 'src/core/types/enum/session-name.enum';

export class TimeModel {
  id: number;
  start_time: number;
  end_time: number;
  session_name: SessionNameEnum;
  is_active: boolean;

  constructor(data: Partial<TimeModel>) {
    Object.assign(this, data);
  }
}
