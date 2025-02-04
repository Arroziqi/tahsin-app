import { EventModel } from 'src/features/master-data/data/models/event.model';
import { AcademicTermModel } from './academic-term.model';
import { AdminModel } from '../../../user-management/data/models/admin.model';

export class AcademicCalenderModel {
  id: number;
  academicTerm_id: number;
  event_id: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  admin_id?: number;
  is_active: boolean;

  Admin?: AdminModel;
  AcademicTerm?: AcademicTermModel;
  Event?: EventModel;

  constructor(data: Partial<AcademicCalenderModel>) {
    Object.assign(this, data);
  }
}
