import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain/usecases/usecase';
import { DataState } from '../../../../../core/resources/data.state';
import { AcademicCalenderEntity } from '../../entities/academic-calender.entity';
import { ACADEMIC_CALENDER_REPO_TOKEN } from '../../../../../core/const/provider.token';
import { AcademicCalenderRepository } from '../../repositories/academic-calender.repository';

@Injectable()
export class GetAllAcademicCalenderUsecase
  implements UseCase<void, DataState<AcademicCalenderEntity[]>>
{
  private readonly logger = new Logger(GetAllAcademicCalenderUsecase.name);
  constructor(
    @Inject(ACADEMIC_CALENDER_REPO_TOKEN)
    private readonly academicCalenderRepository: AcademicCalenderRepository,
  ) {}

  async execute(): Promise<DataState<AcademicCalenderEntity[]>> {
    this.logger.debug('Getting all academic calenders');
    const result: DataState<AcademicCalenderEntity[]> =
      await this.academicCalenderRepository.findAll();

    this.logger.log('Successfully retrieved all academic calenders');
    return result;
  }
}
