import { FeeTypesEnum } from '../../../../core/types/enum/fee-types.enum';
import { AdminEntity } from '../../../user-management/domain/entities/admin.entity';

export class AcademicTermPaymentFeeEntity {
  id: number;
  academicTerm_id: number;
  type: FeeTypesEnum;
  amount: number;
  due_date: Date;
  description?: string;
  created_at: Date;
  updated_at: Date;
  admin_id?: number;

  Admin?: AdminEntity;

  constructor(data: Partial<AcademicTermPaymentFeeEntity>) {
    Object.assign(this, data);
  }
}
