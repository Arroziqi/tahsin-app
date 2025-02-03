import { z } from 'zod';
import { FeeType } from '@prisma/client';

export const AddManyPaymentConfirmationSchema = z.object({
  type: z.nativeEnum(FeeType),
  payment_receipt_img_path: z.string().optional(),
  amount: z.number(),
  transaction_number: z.string().optional(),
  transaction_date: z.string().transform((val) => new Date(val)),
  notes: z.string().optional(),
  student_id: z.number(),
  admin_id: z.number().optional(),
});

export type AddManyPaymentConfirmationDto = z.infer<
  typeof AddManyPaymentConfirmationSchema
>;
