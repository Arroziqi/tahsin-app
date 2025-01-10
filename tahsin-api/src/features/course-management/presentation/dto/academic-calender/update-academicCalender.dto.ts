import { z } from 'zod';

export const UpdateAcademicCalenderSchema = z
  .object({
    academicTerm_id: z.number(),
    event_id: z.number(),
    start_date: z.string().transform((val) => new Date(val)),
    end_date: z.string().transform((val) => new Date(val)),
  })
  .optional();

export type UpdateAcademicCalenderDto = z.infer<
  typeof UpdateAcademicCalenderSchema
>;
