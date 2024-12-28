import { z } from 'zod';
import { DaysEnum } from 'src/core/types/enum/days.enum';

export const UpdateDaySchema = z.object({
  name: z.nativeEnum(DaysEnum).optional(),
  is_active: z
    .union([
      z.boolean(),
      z.string().transform((val) => {
        if (val.toLowerCase() === 'true') return true;
        if (val.toLowerCase() === 'false') return false;
        throw new Error(
          'Status harus berupa boolean atau string "true"/"false"',
        );
      }),
    ])
    .optional(),
});

export type UpdateDayDto = z.infer<typeof UpdateDaySchema>;
