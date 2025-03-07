import { PaymentConfirmationStatusEnum } from '../../../../../core/types/enum/paymentConfirmation-status.enum';

export interface AddPaymentConfirmationDto {
  payment_receipt_img_path?: string;
  amount: number;
  outstanding_amount: number;
  transaction_date: Date;
  transaction_number: string;
  status: PaymentConfirmationStatusEnum;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
  academicTermPaymentFee_id: number;
  student_id: number;
  admin_id?: number;
}
