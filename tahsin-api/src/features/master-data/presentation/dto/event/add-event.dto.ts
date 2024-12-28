import { z } from 'zod';

export const AddEventSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
});

export type AddEventDto = z.infer<typeof AddEventSchema>;
