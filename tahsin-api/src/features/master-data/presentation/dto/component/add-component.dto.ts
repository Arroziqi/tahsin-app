import { z } from 'zod';

export const AddComponentSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
});

export type AddComponentDto = z.infer<typeof AddComponentSchema>;
