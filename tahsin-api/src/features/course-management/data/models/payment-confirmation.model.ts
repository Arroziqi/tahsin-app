import { PaymentConfirmationStatusEnum } from 'src/core/types/enum/paymentConfirmation-status.enum';
import { UserModel } from '../../../user-management/data/models/user.model';
import { FeeTypesEnum } from 'src/core/types/enum/fee-types.enum';

export class PaymentConfirmationModel {
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

  Student?: UserModel;

  constructor(data: Partial<PaymentConfirmationModel>) {
    Object.assign(this, data);
  }
}
