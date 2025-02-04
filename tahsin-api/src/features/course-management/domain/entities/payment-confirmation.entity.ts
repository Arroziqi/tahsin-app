import { PaymentConfirmationStatusEnum } from 'src/core/types/enum/paymentConfirmation-status.enum';
import { FeeTypesEnum } from 'src/core/types/enum/fee-types.enum';
import { StudentEntity } from '../../../user-management/domain/entities/student.entity';
import { AdminEntity } from '../../../user-management/domain/entities/admin.entity';

export class PaymentConfirmationEntity {
  id: number;
  type: FeeTypesEnum;
  payment_receipt_img_path?: string;
  amount: number;
  transaction_number?: string;
  transaction_date: Date;
  status: PaymentConfirmationStatusEnum;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  student_id: number;
  admin_id?: number;

  Student?: StudentEntity;
  Admin?: AdminEntity;

  constructor(data: Partial<PaymentConfirmationEntity>) {
    Object.assign(this, data);
  }
}
