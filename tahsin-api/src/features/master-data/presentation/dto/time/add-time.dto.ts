import { z } from 'zod';
import { SessionNameEnum } from 'src/core/types/enum/session-name.enum';

export const AddTimeSchema = z.object({
  start_time: z
    .string({
      required_error: 'Waktu harus diisi',
      invalid_type_error: 'Waktu harus berupa string',
    })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format waktu harus HH:mm'),

  end_time: z
    .string({
      required_error: 'Waktu harus diisi',
      invalid_type_error: 'Waktu harus berupa string',
    })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format waktu harus HH:mm'),

  session_name: z.nativeEnum(SessionNameEnum),
});

export type AddTimeDto = z.infer<typeof AddTimeSchema>;
