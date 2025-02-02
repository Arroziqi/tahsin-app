import { MeetingTypeEnum } from 'src/core/types/enum/meeting-type.enum';
import { UserModel } from '../../../user-management/data/models/user.model';
import { MeetingTimeEnum } from 'src/core/types/enum/meeting-time.enum';
import { AcademicTermModel } from './academic-term.model';

export class RegistrationModel {
  id: number;
  session_type: MeetingTypeEnum;
  session_time: MeetingTimeEnum;
  objective: string;
  audio_path?: string;
  available_dateTime?: Date;
  academicTerm_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  admin_id?: number;

  AcademicTerm?: AcademicTermModel;
  User?: UserModel;

  constructor(data: Partial<RegistrationModel>) {
    Object.assign(this, data);
  }
}
