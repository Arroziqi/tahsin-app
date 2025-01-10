import { z } from 'zod';

export const AddAcademicCalenderSchema = z.object({
  academicTerm_id: z.number(),
  event_id: z.number(),
  start_date: z.string().transform((val) => new Date(val)),
  end_date: z.string().transform((val) => new Date(val)),
});

export type AddAcademicCalenderDto = z.infer<typeof AddAcademicCalenderSchema>;
