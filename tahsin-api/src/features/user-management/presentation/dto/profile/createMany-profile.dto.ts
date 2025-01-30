import { z } from 'zod';

export const CreateManyProfileSchema = z.object({
  name: z
    .string({
      required_error: 'Nama wajib diisi',
    })
    .min(3, 'Nama minimal 3 karakter'),

  place_of_birth: z.string({
    required_error: 'Tempat lahir wajib diisi',
  }),

  date_of_birth: z
    .string()
    .transform((val) => new Date(val))
    .optional(),

  address: z.string({
    required_error: 'Alamat wajib diisi',
  }),

  domicile: z.string({
    required_error: 'Domisili wajib diisi',
  }),

  phone_number: z.string({
    required_error: 'Nomor telepon wajib diisi',
  }),

  profession: z.string({
    required_error: 'Profesi wajib diisi',
  }),
  previous_education: z.string({
    required_error: 'Edukasi wajib diisi',
  }),
  intended_program: z.string().optional(),
  user_id: z.number().optional(),
  admin_id: z.number().optional(),
});

export type CreateManyProfileDto = z.infer<typeof CreateManyProfileSchema>;
