import { z } from 'zod';

export const UpdateLevelRegistrationSchema = z.object({
  level_id: z.number(),
});

export type UpdateLevelRegistrationDto = z.infer<
  typeof UpdateLevelRegistrationSchema
>;
