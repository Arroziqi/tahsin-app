import { z } from 'zod';

export const CreateProfileSchema = z.object({
  name: z
    .string({
      required_error: 'Nama wajib diisi',
    })
    .min(3, 'Nama minimal 3 karakter'),

  place_of_birth: z.string({
    required_error: 'Tempat lahir wajib diisi',
  }),

  date_of_birth: z
    .string({
      required_error: 'Tanggal lahir wajib diisi',
    })
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'Format tanggal tidak valid. Gunakan format YYYY-MM-DD',
    ),

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
});

export type CreateProfileDto = z.infer<typeof CreateProfileSchema>;
