import { z } from 'zod';

export const SignupUserSchema = z.object({
  username: z
    .string()
    .min(5, 'Username minimal 5 karakter')
    .max(10, 'Username maksimal 10 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .refine((val) => /[A-Za-z]/.test(val), {
      message: 'Password harus mengandung setidaknya satu huruf',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password harus mengandung setidaknya satu angka',
    }),
});

export type SignupDto = z.infer<typeof SignupUserSchema>;
