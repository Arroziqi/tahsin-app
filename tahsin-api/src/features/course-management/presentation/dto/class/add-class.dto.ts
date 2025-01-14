import { z } from 'zod';

export const AddClassSchema = z.object({
  name: z.string(),
  level_id: z.number(),
  teacher_id: z.number(),
});

export type AddClassDto = z.infer<typeof AddClassSchema>;
