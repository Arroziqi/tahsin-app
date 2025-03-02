import { StudentStatusEnum } from '../../../../../core/types/enum/student-status.enum';

export interface AddStudentDto {
  registration_id: number;
  level_id?: number;
  user_id: number;
  status: StudentStatusEnum;
}
