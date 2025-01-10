import { DataState } from '../../../../core/resources/data.state';
import { AddAcademicCalenderDto } from '../../presentation/dto/academic-calender/add-academicCalender.dto';
import { AcademicCalenderEntity } from '../entities/academic-calender.entity';

export interface AcademicCalenderRepository {
  findAll(): Promise<DataState<AcademicCalenderEntity[]>>;
  findById(id: number): Promise<DataState<AcademicCalenderEntity>>;
  findByEventId(event_id: number): Promise<DataState<AcademicCalenderEntity[]>>;
  findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<AcademicCalenderEntity[]>>;
  create(
    academicCalender: AddAcademicCalenderDto,
  ): Promise<DataState<AcademicCalenderEntity>>;
  update(
    academicCalender: AcademicCalenderEntity,
  ): Promise<DataState<AcademicCalenderEntity>>;
  delete(id: number): Promise<DataState<string>>;
}
