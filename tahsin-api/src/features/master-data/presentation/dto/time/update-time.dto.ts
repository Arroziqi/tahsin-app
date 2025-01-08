import { z } from 'zod';
import { SessionName } from '@prisma/client';

export const UpdateTimeSchema = z.object({
  start_time: z
    .string({
      required_error: 'Waktu harus diisi',
      invalid_type_error: 'Waktu harus berupa string',
    })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format waktu harus HH:mm')
    .optional(),

  end_time: z
    .string({
      required_error: 'Waktu harus diisi',
      invalid_type_error: 'Waktu harus berupa string',
    })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format waktu harus HH:mm')
    .optional(),

  session_name: z.nativeEnum(SessionName).optional(),

  is_active: z
    .union([z.boolean(), z.string()])
    .refine((value) => {
      if (typeof value === 'string') {
        return ['true', 'false', '1', '0'].includes(value.toLowerCase());
      }
      return true;
    }, 'Status harus berupa boolean atau string yang dapat dikonversi ke boolean (true/false, 1/0)')
    .transform((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true' || value === '1';
      }
      return value;
    })
    .default(true)
    .describe('Status harus diisi')
    .optional(),
});

export type UpdateTimeDto = z.infer<typeof UpdateTimeSchema>;
