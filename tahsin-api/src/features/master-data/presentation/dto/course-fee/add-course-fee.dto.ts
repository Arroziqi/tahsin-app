import { z } from 'zod';

export const AddCourseFeeSchema = z.object({
  fee: z.number({ message: 'fee harus berupa angka' }),
  class_id: z.number({ message: 'class id harus berupa angka' }),
});

export type AddCourseFeeDto = z.infer<typeof AddCourseFeeSchema>;
