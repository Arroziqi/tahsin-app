import { z } from 'zod';
import { MeetingTypeEnum } from '@prisma/client';

export const UpdateScheduleSchema = z.object({
  day_id: z.number().optional(),
  time_id: z.number().optional(),
  type: z.nativeEnum(MeetingTypeEnum).optional(),
});

export type UpdateScheduleDto = z.infer<typeof UpdateScheduleSchema>;
