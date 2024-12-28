import { z } from 'zod';

export const SingleUserSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  role_id: z.number(),
});

export const AddUsersSchema = z.array(SingleUserSchema);

export type AddUsersDto = z.infer<typeof AddUsersSchema>;
