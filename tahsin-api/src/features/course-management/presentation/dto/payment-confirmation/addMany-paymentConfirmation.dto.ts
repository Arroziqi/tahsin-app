import { z } from 'zod';

export const AddManyPaymentConfirmationSchema = z.object({
  payment_receipt_img_path: z.string().optional(),
  amount: z.number(),
  transaction_number: z.string().optional(),
  transaction_date: z.string().transform((val) => new Date(val)),
  notes: z.string().optional(),
  academicTermPaymentFee_id: z.number(),
  student_id: z.number(),
  admin_id: z.number().optional(),
});

export type AddManyPaymentConfirmationDto = z.infer<
  typeof AddManyPaymentConfirmationSchema
>;
