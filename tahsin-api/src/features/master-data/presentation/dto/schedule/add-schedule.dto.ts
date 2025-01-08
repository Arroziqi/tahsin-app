import { z } from 'zod';
import { MeetingTypeEnum } from '@prisma/client';

export const AddScheduleSchema = z.object({
  day_id: z.number(),
  time_id: z.number(),
  type: z.nativeEnum(MeetingTypeEnum),
});

export type AddScheduleDto = z.infer<typeof AddScheduleSchema>;
