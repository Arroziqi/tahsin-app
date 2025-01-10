import { Inject, Injectable, Logger } from '@nestjs/common';
import { AcademicCalenderRepository } from '../../domain/repositories/academic-calender.repository';
import { DataState } from 'src/core/resources/data.state';
import { AcademicCalenderEntity } from '../../domain/entities/academic-calender.entity';
import { ACADEMIC_CALENDER_REPO_TOKEN } from '../../../../core/const/provider.token';
import { AddAcademicCalenderDto } from '../../presentation/dto/academic-calender/add-academicCalender.dto';

@Injectable()
export class AcademicCalenderRepositoryImpl
  implements AcademicCalenderRepository
{
  private readonly logger = new Logger(AcademicCalenderRepositoryImpl.name);
  constructor(
    @Inject(ACADEMIC_CALENDER_REPO_TOKEN)
    private readonly academicCalenderRepository: AcademicCalenderRepository,
  ) {}
  async findAll(): Promise<DataState<AcademicCalenderEntity[]>> {
    return await this.academicCalenderRepository.findAll();
  }
  async findById(id: number): Promise<DataState<AcademicCalenderEntity>> {
    return await this.academicCalenderRepository.findById(id);
  }
  async findByEventId(
    event_id: number,
  ): Promise<DataState<AcademicCalenderEntity[]>> {
    return await this.academicCalenderRepository.findByEventId(event_id);
  }
  async findByAcademicTermId(
    academicTerm_id: number,
  ): Promise<DataState<AcademicCalenderEntity[]>> {
    return await this.academicCalenderRepository.findByAcademicTermId(
      academicTerm_id,
    );
  }
  async create(
    academicCalender: AddAcademicCalenderDto,
  ): Promise<DataState<AcademicCalenderEntity>> {
    return await this.academicCalenderRepository.create(academicCalender);
  }
  async update(
    academicCalender: AcademicCalenderEntity,
  ): Promise<DataState<AcademicCalenderEntity>> {
    return await this.academicCalenderRepository.update(academicCalender);
  }
  async delete(id: number): Promise<DataState<string>> {
    return await this.academicCalenderRepository.delete(id);
  }
}
