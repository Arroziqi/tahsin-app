import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { AcademicCalenderRepository } from '../../repositories/academic-calender.repository';
import { ACADEMIC_CALENDER_REPO_TOKEN } from 'src/core/const/provider.token';
import { AddAcademicCalenderDto } from 'src/features/course-management/presentation/dto/academic-calender/add-academicCalender.dto';
import { AcademicCalenderEntity } from '../../entities/academic-calender.entity';

@Injectable()
export class AddAcademicCalenderUsecase
  implements UseCase<AddAcademicCalenderDto, DataState<AcademicCalenderEntity>>
{
  private readonly logger = new Logger(AddAcademicCalenderUsecase.name);
  constructor(
    @Inject(ACADEMIC_CALENDER_REPO_TOKEN)
    private readonly academicCalenderRepository: AcademicCalenderRepository,
  ) {}
  async execute(
    input: AddAcademicCalenderDto,
  ): Promise<DataState<AcademicCalenderEntity>> {
    this.logger.debug('Creating academic calender');
    const result = await this.academicCalenderRepository.create(input);

    this.logger.log(`new academic calender created`);
    return result;
  }
}
