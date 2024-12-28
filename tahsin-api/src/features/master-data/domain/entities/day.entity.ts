import { DaysEnum } from 'src/core/types/enum/days.enum';

export class DayEntity {
  id: number;
  name: DaysEnum;
  is_active: boolean;

  constructor(data: Partial<DayEntity>) {
    Object.assign(this, data);
  }
}
