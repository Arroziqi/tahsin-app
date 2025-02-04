import { AdminModel } from '../../../user-management/data/models/admin.model';

export class AcademicTermModel {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  description?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  admin_id?: number;

  Admin?: AdminModel;

  constructor(data: Partial<AcademicTermModel>) {
    Object.assign(this, data);
  }
}
