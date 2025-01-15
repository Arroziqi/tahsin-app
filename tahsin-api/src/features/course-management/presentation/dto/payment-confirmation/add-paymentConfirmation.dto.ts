import { z } from 'zod';
import { FeeType } from '@prisma/client';

export const AddPaymentConfirmationSchema = z.object({
  type: z.nativeEnum(FeeType),
  payment_receipt_img_path: z.string(),
  amount: z.number(),
  transaction_number: z.string(),
  transaction_date: z.string().transform((val) => new Date(val)),
  student_id: z.number().optional(),
});

export type AddPaymentConfirmationDto = z.infer<
  typeof AddPaymentConfirmationSchema
>;
