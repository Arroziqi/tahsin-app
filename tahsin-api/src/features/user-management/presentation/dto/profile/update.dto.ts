import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z
    .string({
      required_error: 'Nama wajib diisi',
    })
    .min(3, 'Nama minimal 3 karakter')
    .optional(),

  place_of_birth: z
    .string({
      required_error: 'Tempat lahir wajib diisi',
    })
    .optional(),

  date_of_birth: z
    .string({
      required_error: 'Tanggal lahir wajib diisi',
    })
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'Format tanggal tidak valid. Gunakan format YYYY-MM-DD',
    )
    .optional(),

  address: z
    .string({
      required_error: 'Alamat wajib diisi',
    })
    .optional(),

  domicile: z
    .string({
      required_error: 'Domisili wajib diisi',
    })
    .optional(),

  phone_number: z
    .string({
      required_error: 'Nomor telepon wajib diisi',
    })
    .optional(),

  profession: z
    .string({
      required_error: 'Profesi wajib diisi',
    })
    .optional(),
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
