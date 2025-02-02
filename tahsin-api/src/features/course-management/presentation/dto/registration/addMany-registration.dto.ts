import { MeetingTimeEnum, MeetingTypeEnum } from '@prisma/client';
import { z } from 'zod';

export const AddManyRegistrationSchema = z.object({
  session_type: z.nativeEnum(MeetingTypeEnum),
  session_time: z.nativeEnum(MeetingTimeEnum),
  objective: z.string().max(500),
  academicTerm_id: z.number(),
  user_id: z.number(),
  audio_path: z.string().optional(),
  available_dateTime: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  admin_id: z.number().optional(),
});

export type AddManyRegistrationDto = z.infer<typeof AddManyRegistrationSchema>;
