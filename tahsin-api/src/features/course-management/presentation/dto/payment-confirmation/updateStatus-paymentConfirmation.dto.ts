import { z } from 'zod';
import { PaymentConfirmationStatus } from '@prisma/client';

export const UpdateStatusPaymentConfirmationSchema = z.object({
  notes: z.string().optional(),
  status: z.nativeEnum(PaymentConfirmationStatus),
});

export type UpdateStatusPaymentConfirmationDto = z.infer<
  typeof UpdateStatusPaymentConfirmationSchema
>;
