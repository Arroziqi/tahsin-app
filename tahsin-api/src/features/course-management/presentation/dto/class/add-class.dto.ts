import { z } from 'zod';

export const AddClassSchema = z.object({
  name: z.string(),
  level_id: z.number(),
  user_id: z.number(),
});

export type AddClassDto = z.infer<typeof AddClassSchema>;
