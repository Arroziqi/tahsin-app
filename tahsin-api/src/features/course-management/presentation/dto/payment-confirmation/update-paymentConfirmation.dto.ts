import { z } from 'zod';
import { PaymentConfirmationStatus } from '@prisma/client';

export const UpdatePaymentConfirmationSchema = z.object({
  payment_receipt_img_path: z.string().optional(),
  amount: z.number().optional(),
  transaction_number: z.string().optional(),
  transaction_date: z
    .string()
    .transform((val: string): Date => new Date(val))
    .optional(),
  notes: z.string().optional(),
  status: z.nativeEnum(PaymentConfirmationStatus).default('PENDING'),
  student_id: z.number().optional(),
});

export type UpdatePaymentConfirmationDto = z.infer<
  typeof UpdatePaymentConfirmationSchema
>;
