import { z } from 'zod';
import { Days } from '@prisma/client';

export const AddDaySchema = z.object({
  name: z.nativeEnum(Days),
});

export type AddDayDto = z.infer<typeof AddDaySchema>;
