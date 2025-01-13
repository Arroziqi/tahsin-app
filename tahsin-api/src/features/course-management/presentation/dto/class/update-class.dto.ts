import { z } from 'zod';

export const UpdateClassSchema = z.object({
  name: z.string().optional(),
  level_id: z.number().optional(),
  user_id: z.number().optional(),
});

export type UpdateClassDto = z.infer<typeof UpdateClassSchema>;
