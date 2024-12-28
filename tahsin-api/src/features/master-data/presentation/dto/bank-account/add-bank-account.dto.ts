import { z } from 'zod';

export const AddBankAccountSchema = z.object({
  accountName: z.string().min(3, 'Nama minimal 3 karakter'),
  accountNumber: z.number({ message: 'account number harus berupa angka' }),
  bankName: z.string(),
});

export type AddBankAccountDto = z.infer<typeof AddBankAccountSchema>;
