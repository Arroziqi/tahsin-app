import { PaymentConfirmationStatusEnum } from 'src/core/types/enum/paymentConfirmation-status.enum';
import { StudentEntity } from '../../../user-management/domain/entities/student.entity';
import { AdminEntity } from '../../../user-management/domain/entities/admin.entity';
import { AcademicTermPaymentFeeEntity } from './academicTerm-paymentFee.entity';

export class PaymentConfirmationEntity {
  id: number;
  payment_receipt_img_path?: string;
  amount: number;
  outstanding_amount: number;
  transaction_number: string;
  transaction_date: Date;
  status: PaymentConfirmationStatusEnum;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  academicTermPaymentFee_id: number;
  student_id: number;
  admin_id?: number;

  AcademicTermPaymentFee?: AcademicTermPaymentFeeEntity;
  Student?: StudentEntity;
  Admin?: AdminEntity;

  constructor(data: Partial<PaymentConfirmationEntity>) {
    Object.assign(this, data);
  }
}
