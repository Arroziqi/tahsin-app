import { PaymentConfirmationStatusEnum } from 'src/core/types/enum/paymentConfirmation-status.enum';
import { UserEntity } from '../../../user-management/domain/entities/user.entity';
import { FeeTypesEnum } from 'src/core/types/enum/fee-types.enum';

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

  Student?: UserEntity;

  constructor(data: Partial<PaymentConfirmationEntity>) {
    Object.assign(this, data);
  }
}
