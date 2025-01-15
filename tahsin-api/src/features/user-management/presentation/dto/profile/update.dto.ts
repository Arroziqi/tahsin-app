import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),

  place_of_birth: z.string().optional(),

  date_of_birth: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'Format tanggal tidak valid. Gunakan format YYYY-MM-DD',
    )
    .optional(),

  address: z.string().optional(),

  domicile: z.string().optional(),

  phone_number: z.string().optional(),

  profession: z.string().optional(),
  previous_education: z.string().optional(),
  intended_program: z.string().optional(),
  user_id: z.number().optional(),
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
