import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { ACADEMIC_CALENDER_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicCalenderRepository } from '../../repositories/academic-calender.repository';
import { AcademicCalenderService } from '../../services/academic-calender.service';
import { AcademicCalenderEntity } from '../../entities/academic-calender.entity';

@Injectable()
export class UpdateAcademicCalenderUsecase
  implements UseCase<AcademicCalenderEntity, DataState<AcademicCalenderEntity>>
{
  private readonly logger = new Logger(UpdateAcademicCalenderUsecase.name);
  constructor(
    @Inject(ACADEMIC_CALENDER_REPO_TOKEN)
    private readonly academicCalenderRepository: AcademicCalenderRepository,
    private readonly academicCalenderService: AcademicCalenderService,
  ) {}
  async execute(
    input: AcademicCalenderEntity,
  ): Promise<DataState<AcademicCalenderEntity>> {
    const existingAcademicCalender =
      await this.academicCalenderService.getAcademicCalender(input.id);

    const data: AcademicCalenderEntity = {
      ...input,
      created_at: existingAcademicCalender.data.created_at,
    };

    this.logger.debug('Updating academic calender');
    const result = await this.academicCalenderRepository.update(data);

    this.logger.log('Successfully updated academic calender');
    return result;
  }
}
