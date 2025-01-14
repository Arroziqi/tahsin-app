import { z } from 'zod';

export const AddAcademicTermSchema = z.object({
  name: z.string(),
  start_date: z.string().transform((val) => new Date(val)),
  end_date: z.string().transform((val) => new Date(val)),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type AddAcademicTermDto = z.infer<typeof AddAcademicTermSchema>;
