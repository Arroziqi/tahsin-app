import { z } from 'zod';

export const UpdateBankAccountSchema = z.object({
  accountName: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  accountNumber: z
    .number({ message: 'account number harus berupa angka' })
    .optional(),
  bankName: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type UpdateBankAccountDto = z.infer<typeof UpdateBankAccountSchema>;
