import { z } from 'zod';

export const AddAcademicTermSchema = z.object({
  name: z.string(),
});

export type AddAcademicTermDto = z.infer<typeof AddAcademicTermSchema>;
