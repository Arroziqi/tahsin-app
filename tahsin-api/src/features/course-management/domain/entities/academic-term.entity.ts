import { AdminEntity } from '../../../user-management/domain/entities/admin.entity';

export class AcademicTermEntity {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  description?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  admin_id?: number;

  Admin?: AdminEntity;

  constructor(data: Partial<AcademicTermEntity>) {
    Object.assign(this, data);
  }
}
