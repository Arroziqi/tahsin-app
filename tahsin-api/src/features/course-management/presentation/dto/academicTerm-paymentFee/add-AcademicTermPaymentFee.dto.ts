import { FeeType } from '@prisma/client';
import { z } from 'zod';

export const AddAcademicTermPaymentFeeSchema = z.object({
  academicTerm_id: z.number(),
  type: z.nativeEnum(FeeType),
  amount: z.number(),
  due_date: z.string().transform((val) => new Date(val)),
  description: z.string().optional(),
});

export type AddAcademicTermPaymentFeeDto = z.infer<
  typeof AddAcademicTermPaymentFeeSchema
>;
