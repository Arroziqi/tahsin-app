import { MeetingTimeEnum, MeetingTypeEnum } from '@prisma/client';
import { z } from 'zod';

export const AddRegistrationSchema = z.object({
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
});

export type AddRegistrationDto = z.infer<typeof AddRegistrationSchema>;
