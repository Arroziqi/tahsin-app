import { z } from 'zod';
import { FeeType } from '@prisma/client';

export const UpdatePaymentConfirmationSchema = z.object({
  type: z.nativeEnum(FeeType).optional(),
  payment_receipt_img_path: z.string().optional(),
  amount: z.number().optional(),
  transaction_number: z.string().optional(),
  transaction_date: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  student_id: z.number().optional(),
});

export type UpdatePaymentConfirmationDto = z.infer<
  typeof UpdatePaymentConfirmationSchema
>;
