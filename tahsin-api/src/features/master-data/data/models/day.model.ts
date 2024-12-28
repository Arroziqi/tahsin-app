import { DaysEnum } from 'src/core/types/enum/days.enum';

export class DayModel {
  id: number;
  name: DaysEnum;
  is_active: boolean;

  constructor(data: Partial<DayModel>) {
    Object.assign(this, data);
  }
}
