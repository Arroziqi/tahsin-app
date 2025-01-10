import { z } from 'zod';

export const UpdateAcademicTermSchema = z.object({
  name: z.string().optional(),
});

export type UpdateAcademicTermDto = z.infer<typeof UpdateAcademicTermSchema>;
