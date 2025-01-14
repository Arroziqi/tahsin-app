import { FeeType } from '@prisma/client';
import { z } from 'zod';

export const UpdateAcademicTermPaymentFeeSchema = z.object({
  academicTerm_id: z.number().optional(),
  type: z.nativeEnum(FeeType).optional(),
  amount: z.number().optional(),
  due_date: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  description: z.string().optional(),
});

export type UpdateAcademicTermPaymentFeeDto = z.infer<
  typeof UpdateAcademicTermPaymentFeeSchema
>;
