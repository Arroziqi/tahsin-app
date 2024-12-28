import { z } from 'zod';

export const UpdateComponentSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
});

export type UpdateComponentDto = z.infer<typeof UpdateComponentSchema>;
