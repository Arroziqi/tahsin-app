import { MeetingTypeEnum } from 'src/core/types/enum/meeting-type.enum';
import { UserEntity } from '../../../user-management/domain/entities/user.entity';
import { MeetingTimeEnum } from 'src/core/types/enum/meeting-time.enum';
import { AcademicTermEntity } from './academic-term.entity';
import { AdminEntity } from '../../../user-management/domain/entities/admin.entity';
import { LevelEntity } from '../../../master-data/domain/entities/level.entity';

export class RegistrationEntity {
  id: number;
  session_type: MeetingTypeEnum;
  session_time: MeetingTimeEnum;
  objective: string;
  audio_path?: string;
  available_dateTime?: Date;
  level_id?: number;
  academicTerm_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  admin_id?: number;

  AcademicTerm?: AcademicTermEntity;
  Level?: LevelEntity;
  User?: UserEntity;
  Admin?: AdminEntity;

  constructor(data: Partial<RegistrationEntity>) {
    Object.assign(this, data);
  }
}
