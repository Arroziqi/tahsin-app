import { z } from 'zod';
import { DaysEnum } from 'src/core/types/enum/days.enum';

export const AddDaySchema = z.object({
  name: z.nativeEnum(DaysEnum),
});

export type AddDayDto = z.infer<typeof AddDaySchema>;
