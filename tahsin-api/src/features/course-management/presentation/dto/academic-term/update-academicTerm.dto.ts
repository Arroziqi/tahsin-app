import { z } from 'zod';

export const UpdateAcademicTermSchema = z.object({
  name: z.string().optional(),
  start_date: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  end_date: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  description: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type UpdateAcademicTermDto = z.infer<typeof UpdateAcademicTermSchema>;
