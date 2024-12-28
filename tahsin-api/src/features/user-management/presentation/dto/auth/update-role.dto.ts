import { z } from 'zod';

export const UpdateRoleDtoSchema = z.object({
  role_id: z.number(),
});

export type UpdateRoleDto = z.infer<typeof UpdateRoleDtoSchema>;
