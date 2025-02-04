import { FeeTypesEnum } from '../../../../core/types/enum/fee-types.enum';
import { AdminModel } from '../../../user-management/data/models/admin.model';

export class AcademicTermPaymentFeeModel {
  id: number;
  academicTerm_id: number;
  type: FeeTypesEnum;
  amount: number;
  due_date: Date;
  description?: string;
  created_at: Date;
  updated_at: Date;
  admin_id?: number;

  Admin?: AdminModel;

  constructor(data: Partial<AcademicTermPaymentFeeModel>) {
    Object.assign(this, data);
  }
}
