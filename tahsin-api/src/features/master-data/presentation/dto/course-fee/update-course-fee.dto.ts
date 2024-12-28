import { z } from 'zod';

export const UpdateCourseFeeSchema = z.object({
  fee: z.number({ message: 'fee harus berupa angka' }).optional(),
  class_id: z.number({ message: 'class id harus berupa angka' }).optional(),
});

export type UpdateCourseFeeDto = z.infer<typeof UpdateCourseFeeSchema>;
