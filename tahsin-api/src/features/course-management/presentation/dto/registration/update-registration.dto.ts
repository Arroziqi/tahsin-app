import { MeetingTimeEnum, MeetingTypeEnum } from '@prisma/client';
import { z } from 'zod';

export const UpdateRegistrationSchema = z.object({
  session_type: z.nativeEnum(MeetingTypeEnum).optional(),
  session_time: z.nativeEnum(MeetingTimeEnum).optional(),
  objective: z.string().max(500).optional(),
  audio_path: z.string().optional(),
  available_dateTime: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  academicTerm_id: z.number().optional(),
  user_id: z.number().optional(),
});

export type UpdateRegistrationDto = z.infer<typeof UpdateRegistrationSchema>;
