import { z } from 'zod';
import { StudentStatus } from '@prisma/client';

export const UpdateStudentSchema = z.object({
  registration_id: z.number().optional(),
  level_id: z.number().optional(),
  user_id: z.number().optional(),
  status: z.nativeEnum(StudentStatus).optional(),
  admin_id: z.number().optional(),
});

export type UpdateStudentDto = z.infer<typeof UpdateStudentSchema>;
