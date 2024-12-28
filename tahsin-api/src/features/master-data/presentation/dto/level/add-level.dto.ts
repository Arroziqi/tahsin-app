import { z } from 'zod';

export const AddLevelSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
});

export type AddLevelDto = z.infer<typeof AddLevelSchema>;
