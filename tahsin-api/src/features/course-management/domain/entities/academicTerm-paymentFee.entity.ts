import { UserEntity } from '../../../user-management/domain/entities/user.entity';
import { FeeTypesEnum } from '../../../../core/types/enum/fee-types.enum';

export class AcademicTermPaymentFeeEntity {
  id: number;
  academicTerm_id: number;
  type: FeeTypesEnum;
  amount: number;
  due_date: Date;
  description?: string;
  created_at: Date;
  updated_at: Date;
  admin_id: number;

  Admin?: UserEntity;

  constructor(data: Partial<AcademicTermPaymentFeeEntity>) {
    Object.assign(this, data);
  }
}
