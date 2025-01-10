import { EventEntity } from 'src/features/master-data/domain/entities/event.entity';
import { AcademicTermEntity } from './academic-term.entity';

export class AcademicCalenderEntity {
  id: number;
  academicTerm_id: number;
  event_id: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;

  AcademicTerm?: AcademicTermEntity;
  Event?: EventEntity;

  constructor(data: Partial<AcademicCalenderEntity>) {
    Object.assign(this, data);
  }
}
