import { EventModel } from 'src/features/master-data/data/models/event.model';
import { AcademicTermModel } from './academic-term.model';

export class AcademicCalenderModel {
  id: number;
  academicTerm_id: number;
  event_id: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;

  AcademicTerm?: AcademicTermModel;
  Event?: EventModel;

  constructor(data: Partial<AcademicCalenderModel>) {
    Object.assign(this, data);
  }
}
