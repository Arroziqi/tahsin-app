import { PaymentConfirmationStatusEnum } from 'src/core/types/enum/paymentConfirmation-status.enum';
import { StudentModel } from '../../../user-management/data/models/student.model';
import { AdminModel } from '../../../user-management/data/models/admin.model';

export class PaymentConfirmationModel {
  id: number;
  payment_receipt_img_path?: string;
  amount: number;
  transaction_number: string;
  transaction_date: Date;
  status: PaymentConfirmationStatusEnum;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  student_id: number;
  admin_id?: number;

  Student?: StudentModel;
  Admin?: AdminModel;

  constructor(data: Partial<PaymentConfirmationModel>) {
    Object.assign(this, data);
  }
}
