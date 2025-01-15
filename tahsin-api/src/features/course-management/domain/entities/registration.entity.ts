import { MeetingTypeEnum } from 'src/core/types/enum/meeting-type.enum';
import { UserEntity } from '../../../user-management/domain/entities/user.entity';
import { MeetingTimeEnum } from 'src/core/types/enum/meeting-time.enum';
import { AcademicTermEntity } from './academic-term.entity';

export class RegistrationEntity {
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

  AcademicTerm?: AcademicTermEntity;
  User?: UserEntity;

  constructor(data: Partial<RegistrationEntity>) {
    Object.assign(this, data);
  }
}
